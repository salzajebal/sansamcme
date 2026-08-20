# CME Group — E-mini Nasdaq-100

E-mini Nasdaq-100 선물 및 옵션 상품 정보를 보여 주는 React 웹 애플리케이션입니다. 브라우저는 Nginx가 제공하는 정적 프론트엔드를 사용하고, 같은 도메인의 `/api` 요청은 Express API 서버로 전달됩니다. PostgreSQL은 별도 Docker 컨테이너와 영속 볼륨으로 실행됩니다.

이 저장소에는 Replit 없이도 Vultr Ubuntu VPS에서 독립적으로 실행할 수 있는 Docker Compose 설정과 GitHub Actions 자동 배포 설정이 포함되어 있습니다.

## 구성

| 구성 요소 | 역할 | 외부 공개 |
| --- | --- | --- |
| `web` | Nginx + React 정적 사이트 | HTTP 80 포트 |
| `api` | Express API 및 시장 데이터 조회 | 공개하지 않음. Nginx를 통해서만 접근 |
| `db` | PostgreSQL 16 | 공개하지 않음. Docker 내부 통신만 허용 |
| `migrate` | 시작 시 Drizzle 스키마 동기화 후 종료 | 공개하지 않음 |

`postgres_data` Docker 볼륨에 데이터가 저장되므로, 컨테이너를 다시 만들더라도 데이터베이스 데이터는 유지됩니다. VPS 자체의 백업은 별도로 설정해야 합니다.

## GitHub 원격 저장소

현재 원격 저장소는 다음 주소로 설정되어 있습니다.

```text
https://github.com/salzajebal/sansamcme
```

Replit에서 최초로 커밋/푸시할 때 Git 사용자 정보가 없다면 아래 명령을 한 번 실행합니다. 이메일은 GitHub 계정에 등록된 이메일을 사용하세요.

```bash
git config --global user.name "내 GitHub 이름"
git config --global user.email "내 GitHub 이메일"
```

변경 사항 확인, 커밋, 푸시:

```bash
git status
git add .
git commit -m "Configure Vultr deployment"
git push origin main
```

> 실제 `.env` 파일, SSH 개인 키, GitHub Actions 비밀 값은 절대 커밋하지 마세요. 이 저장소의 `.gitignore`가 `.env`를 제외하도록 설정되어 있습니다.

## Vultr Ubuntu VPS 최초 설치

아래 예시는 Ubuntu 22.04 또는 24.04 기준입니다. Vultr 방화벽과 서버 방화벽(UFW)에서 최소한 TCP `22`, `80`을 허용하세요. HTTPS를 사용할 경우 나중에 TCP `443`도 허용해야 합니다.

### 1. Docker 및 Git 설치

VPS에 SSH로 접속한 뒤 실행합니다.

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg git
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo usermod -aG docker "$USER"
```

`usermod` 적용을 위해 SSH 연결을 끊었다가 다시 접속하거나 아래를 실행합니다.

```bash
newgrp docker
```

### 2. GitHub 저장소를 VPS로 복제

공개 저장소라면 바로 복제할 수 있습니다.

```bash
sudo mkdir -p /opt/cme-group
sudo chown "$USER":"$USER" /opt/cme-group
git clone https://github.com/salzajebal/sansamcme.git /opt/cme-group
cd /opt/cme-group
```

비공개 저장소라면 VPS에서 GitHub 읽기 전용 배포 키를 생성한 뒤 GitHub 저장소의 **Settings → Deploy keys**에 공개 키를 등록하세요.

```bash
ssh-keygen -t ed25519 -f ~/.ssh/cme-group-github -C "cme-group-vultr-readonly"
cat ~/.ssh/cme-group-github.pub
```

GitHub에 이 공개 키를 등록한 뒤 `~/.ssh/config`에 아래 내용을 추가합니다.

```text
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/cme-group-github
  IdentitiesOnly yes
```

그리고 SSH 주소로 복제합니다.

```bash
git clone git@github.com:salzajebal/sansamcme.git /opt/cme-group
cd /opt/cme-group
```

### 3. 운영 환경 변수 생성

실제 비밀번호는 GitHub나 Replit에 저장하지 않습니다. 아래 명령은 URL에 안전한 64자리 16진수 비밀번호를 생성하여 `.env`에 기록합니다.

```bash
cd /opt/cme-group
DB_PASSWORD="$(openssl rand -hex 32)"
cat > .env <<EOF
POSTGRES_DB=cme_group
POSTGRES_USER=cme_app
POSTGRES_PASSWORD=${DB_PASSWORD}
DATABASE_URL=postgresql://cme_app:${DB_PASSWORD}@db:5432/cme_group
LOG_LEVEL=info
WEB_PORT=80
EOF
chmod 600 .env
```

이미 외부 PostgreSQL을 사용하려면 `POSTGRES_*` 설정과 `db` 서비스를 제거하지 말고 별도 Compose 파일을 검토한 후, `DATABASE_URL`만 외부 DB URL로 변경하세요. 기본 구성은 VPS 내부 PostgreSQL을 사용합니다.

### 4. 최초 실행

```bash
cd /opt/cme-group
docker compose --env-file .env up -d --build
docker compose --env-file .env ps
curl --fail http://localhost/api/healthz
```

성공하면 브라우저에서 `http://VPS_IP`로 접속할 수 있습니다. Docker의 `restart: unless-stopped`와 Docker 서비스의 자동 시작 설정 덕분에 VPS 재부팅 후에도 웹, API, DB 컨테이너가 자동으로 다시 실행됩니다.

운영 로그:

```bash
docker compose --env-file .env logs -f
```

서비스 중지:

```bash
docker compose --env-file .env down
```

`docker compose down -v`는 PostgreSQL 데이터 볼륨까지 삭제하므로, 데이터가 필요하다면 절대 사용하지 마세요.

## 이후 수동 업데이트

VPS에서 아래 한 줄을 실행하면 최신 `main` 브랜치를 가져와 이미지를 다시 빌드하고 컨테이너를 교체합니다.

```bash
cd /opt/cme-group
bash deploy/update.sh
```

이 스크립트는 `.env`가 없으면 중단하며, `git pull --ff-only`를 사용하므로 서버에서 직접 수정해 Git 이력이 꼬인 경우에도 덮어쓰지 않습니다.

## GitHub 푸시 후 자동 배포

GitHub Actions 비밀 키를 별도로 관리하지 않아도 되도록, VPS가 5분마다 `main` 브랜치를 확인해 변경 사항이 있으면 `deploy/update.sh`를 실행하는 systemd 타이머 파일을 제공합니다. 이 방식은 VPS 재부팅 뒤에도 자동으로 다시 시작됩니다.

VPS에서 최초 한 번만 설정합니다.

```bash
cd /opt/cme-group
sudo cp deploy/cme-group-update.service /etc/systemd/system/
sudo cp deploy/cme-group-update.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now cme-group-update.timer
systemctl list-timers cme-group-update.timer
```

타이머 로그 확인:

```bash
sudo journalctl -u cme-group-update.service -f
```

이후 Replit에서 변경 후 GitHub `main` 브랜치로 푸시하면, VPS가 최대 5분 안에 최신 코드를 받아 컨테이너를 다시 빌드·배포합니다.

```bash
git add .
git commit -m "설명"
git push origin main
```

Replit 터미널에서 `Invalid username or token` 오류가 나오면 GitHub 소스 제어 연결을 다시 인증한 뒤 푸시하세요. 개인 액세스 토큰이나 SSH 개인 키는 채팅이나 코드에 붙여 넣지 마세요.

## 운영 점검 및 백업

컨테이너 상태:

```bash
docker compose --env-file .env ps
```

PostgreSQL 백업:

```bash
mkdir -p backups
docker compose --env-file .env exec -T db \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "backups/cme-group-$(date +%F).sql"
```

`.env`에 정의된 값은 현재 셸에 자동으로 로드되지 않습니다. 백업 전에는 아래 명령으로 값을 로드하세요.

```bash
set -a
source .env
set +a
```

Vultr 스냅샷/백업 서비스도 함께 설정해 Docker 볼륨과 `.env` 파일을 별도로 보호하는 것을 권장합니다.