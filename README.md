# CME Group — E-mini Nasdaq-100

E-mini Nasdaq-100 선물 및 옵션 상품 정보를 제공하는 React 웹 애플리케이션입니다. 정적 프론트엔드는 Nginx가 제공하고, 동일 도메인의 `/api` 요청은 내부 Express API로 전달됩니다. PostgreSQL은 별도 컨테이너와 영속 볼륨으로 실행됩니다.

이 저장소는 Replit과 별개로 **DigitalOcean Ubuntu Droplet**에서 Docker Compose로 실행할 수 있도록 구성되어 있습니다.

## 컨테이너 구성

| 서비스 | 역할 | 외부 공개 |
| --- | --- | --- |
| `web` | Nginx + React 정적 사이트 | HTTP 80 포트 |
| `api` | Express API 및 시장 데이터 조회 | 공개하지 않음. Nginx를 통해서만 접근 |
| `db` | PostgreSQL 16 | 공개하지 않음. Docker 내부 통신만 허용 |
| `migrate` | 시작 시 Drizzle 스키마 동기화 후 종료 | 공개하지 않음 |

`web`, `api`, `db`에는 `restart: unless-stopped`가 설정되어 있어 Droplet 재부팅이나 컨테이너 오류 후 자동으로 다시 시작됩니다. PostgreSQL 데이터는 `postgres_data` Docker 볼륨에 보관되므로 일반적인 컨테이너 재생성으로 삭제되지 않습니다.

## 보안 원칙

- 실제 운영 설정은 `.env`에만 두고 GitHub에 커밋하지 않습니다.
- `.env.example`은 값의 형식만 보여 주는 안전한 예시 파일입니다.
- API와 PostgreSQL은 외부 포트를 열지 않으며 Nginx만 HTTP 포트에 연결됩니다.
- `docker compose down -v`는 PostgreSQL 데이터 볼륨까지 제거하므로 운영 환경에서 실행하지 마세요.

## GitHub 원격 저장소

```text
https://github.com/salzajebal/sansamcme
```

Replit에서 변경 사항을 GitHub `main` 브랜치로 반영하는 기본 흐름입니다.

```bash
git status
git add .
git commit -m "변경 내용"
git push origin main
```

실제 `.env`, SSH 개인 키, 백업 파일, 액세스 토큰은 절대 커밋하거나 채팅에 공유하지 마세요.

## DigitalOcean Droplet 최초 설치

아래 명령은 **Ubuntu 22.04 또는 24.04 Droplet**의 DigitalOcean **Access Console(웹 터미널)** 또는 SSH 세션에서 실행합니다.

### 0. Droplet과 방화벽 준비

DigitalOcean에서 Ubuntu Droplet을 생성한 뒤 Cloud Firewall 또는 Droplet Firewall에서 아래 인바운드 규칙을 허용하세요.

| 프로토콜 | 포트 | 용도 |
| --- | --- | --- |
| TCP | 22 | SSH 관리용 |
| TCP | 80 | 웹사이트 HTTP |
| TCP | 443 | HTTPS 적용 시 사용 |

PostgreSQL `5432`와 API `8080` 포트는 방화벽에서 열지 마세요.

### 1. Docker 및 Git 설치

Access Console은 보통 `root` 사용자로 열립니다. 아래 명령은 `root`와 일반 sudo 사용자 모두에서 실행할 수 있습니다.

```bash
apt-get update
apt-get install -y ca-certificates curl gnupg git openssl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker
```

일반 사용자로 SSH 접속하는 경우에만 Docker 명령을 sudo 없이 사용하려면 다음을 실행한 뒤 다시 로그인하세요.

```bash
sudo usermod -aG docker "$USER"
```

### 2. GitHub에서 소스 코드 복제

공개 저장소인 경우:

```bash
mkdir -p /opt/cme-group
git clone https://github.com/salzajebal/sansamcme.git /opt/cme-group
cd /opt/cme-group
```

비공개 저장소인 경우에는 Droplet에서 읽기 전용 GitHub 배포 키를 생성한 뒤, GitHub 저장소의 **Settings → Deploy keys**에 표시된 공개 키를 추가하세요.

```bash
ssh-keygen -t ed25519 -f ~/.ssh/cme-group-github -C "cme-group-droplet-readonly"
cat ~/.ssh/cme-group-github.pub
```

GitHub에 공개 키를 등록한 뒤 아래와 같이 SSH 주소로 복제합니다.

```bash
git clone git@github.com:salzajebal/sansamcme.git /opt/cme-group
cd /opt/cme-group
```

### 3. 운영 `.env` 생성

아래 명령은 URL에 안전한 PostgreSQL 비밀번호를 생성해 Droplet의 `.env` 파일에만 저장합니다.

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

`.env`는 백업해 두되, GitHub·Replit·채팅에는 저장하지 마세요.

### 4. 첫 실행

```bash
cd /opt/cme-group
docker compose --env-file .env up -d --build
docker compose --env-file .env ps
curl --fail http://localhost/api/healthz
```

`migrate` 서비스는 데이터베이스 스키마 적용 후 `exited (0)` 상태가 되는 것이 정상입니다. 나머지 `web`, `api`, `db`는 실행 상태여야 합니다.

성공하면 브라우저에서 아래 주소로 접속할 수 있습니다.

```text
http://DROPLET_IP
```

실시간 로그:

```bash
docker compose --env-file .env logs -f
```

## 업데이트 배포

### 수동 업데이트 한 줄 명령

Replit에서 변경을 커밋하고 GitHub `main`에 푸시한 뒤, Droplet Access Console에서 아래 한 줄을 실행하세요.

```bash
cd /opt/cme-group && bash deploy/update.sh
```

이 스크립트는 `git pull --ff-only`로 최신 `main`을 받아 Docker 이미지를 다시 빌드하고 컨테이너를 교체합니다. `.env`가 없거나 Git 이력이 충돌하면 안전하게 중단하며, 실행 중인 컨테이너를 삭제하지 않습니다.

명령을 직접 실행하려면 다음과 같습니다.

```bash
cd /opt/cme-group && git pull --ff-only origin main && docker compose --env-file .env up -d --build --remove-orphans
```

### GitHub 푸시 후 자동 업데이트

Droplet이 5분마다 GitHub `main`을 확인해 변경 사항이 있으면 자동으로 업데이트하도록 systemd 타이머를 설정할 수 있습니다. 최초 한 번만 실행하세요.

```bash
cd /opt/cme-group
cp deploy/cme-group-update.service /etc/systemd/system/
cp deploy/cme-group-update.timer /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now cme-group-update.timer
systemctl list-timers cme-group-update.timer
```

타이머 로그:

```bash
journalctl -u cme-group-update.service -f
```

비공개 저장소라면 위 자동 업데이트가 동작하도록 먼저 SSH 배포 키로 `git pull`이 가능한지 확인해야 합니다.

## 운영 점검 및 백업

컨테이너 상태:

```bash
cd /opt/cme-group
docker compose --env-file .env ps
```

PostgreSQL 백업:

```bash
cd /opt/cme-group
set -a
source .env
set +a
mkdir -p backups
docker compose --env-file .env exec -T db \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "backups/cme-group-$(date +%F).sql"
```

`backups/`와 `.env`는 Git에서 제외됩니다. Docker 볼륨까지 보호하려면 DigitalOcean Backups 또는 Droplet Snapshot도 함께 활성화하세요.