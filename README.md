# CME Group — E-mini Nasdaq-100

E-mini Nasdaq-100 선물 및 옵션 상품 정보를 제공하는 React 웹 애플리케이션입니다. 정적 프론트엔드는 Render에서는 Express가, Docker Compose에서는 Nginx가 제공하며, 동일 도메인의 `/api` 요청은 Express API로 전달됩니다. PostgreSQL은 Supabase 또는 Docker Compose의 영속 볼륨으로 운영할 수 있습니다.

이 저장소는 Replit과 별개로 **Render Web Service + Supabase PostgreSQL** 조합 또는 **DigitalOcean Ubuntu Droplet + Docker Compose** 조합으로 실행할 수 있도록 구성되어 있습니다.

## Render + Supabase 배포

Render에서는 루트 `build` 스크립트가 API와 React 프론트엔드를 함께 빌드하고, 루트 `start` 스크립트가 Express 서버 하나로 API와 정적 프론트엔드를 함께 제공합니다. Render의 `PORT`를 그대로 사용하므로 별도의 포트 설정은 필요하지 않습니다.

### 1. Supabase 데이터베이스 준비

1. Supabase에서 프로젝트를 생성합니다.
2. **Connect → Session pooler**의 PostgreSQL 연결 문자열을 복사합니다. Render는 외부 호스트에서 접속하므로 Supabase의 IPv4 호환 Session Pooler 문자열을 사용하는 편이 안전합니다.
3. 연결 문자열의 비밀번호가 특수문자를 포함하면 URL 인코딩합니다. 실제 연결 문자열은 GitHub나 채팅에 올리지 마세요.
4. 현재 프로젝트는 Drizzle ORM과 `pg`를 사용하며 `DATABASE_URL` 하나로 연결됩니다. 별도의 Supabase SDK나 API 키는 필요하지 않습니다.

### 2. Render에 저장소 연결

Render Dashboard에서 **New → Blueprint**를 선택하고 GitHub 저장소 `salzajebal/sansamcme`를 연결한 뒤 `render.yaml`을 적용합니다.

Blueprint가 다음을 자동으로 구성합니다.

- Build Command: `pnpm install --frozen-lockfile && pnpm run build`
- Start Command: `pnpm run start:render`
- Startup schema sync: `pnpm --filter @workspace/db run push`, followed by `pnpm start`
- Health Check: `/api/healthz`
- GitHub `main` 브랜치 푸시 후 자동 배포

Blueprint를 사용하지 않고 Web Service를 직접 만들 때도 같은 명령을 입력하면 됩니다. Render가 제공하는 `PORT`는 수정하지 마세요.

### 3. Render Environment Variables

Render Dashboard의 **Environment → Environment Variables**에 아래 값을 등록합니다.

| Key | Value | 비고 |
| --- | --- | --- |
| `DATABASE_URL` | Supabase Session Pooler PostgreSQL URL | 필수 비밀값. Supabase Connect 화면에서 복사 |
| `NODE_ENV` | `production` | 운영 실행 모드 |
| `LOG_LEVEL` | `info` | 선택 사항 |

`PORT`는 Render가 자동 주입합니다. `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `WEB_PORT`는 Docker Compose용이므로 Render에는 등록하지 않습니다.

### 4. 배포 확인

배포가 끝나면 Render 서비스 URL에서 프론트엔드를 열고 아래 주소가 `{"status":"ok"}`를 반환하는지 확인합니다.

```text
https://<render-service>.onrender.com/api/healthz
```

`start:render`가 웹 서버를 시작하기 전에 Supabase에 Drizzle 스키마를 적용합니다. 이 방식은 Render 무료 플랜의 Web Service에서도 동작하도록 `preDeployCommand`를 사용하지 않습니다. Supabase Dashboard의 SQL Editor나 Database 화면에서 실제 데이터와 테이블을 확인할 수 있습니다. 현재 저장소의 스키마가 변경되면 다음 재배포·재시작 때 자동으로 다시 동기화됩니다.

## Docker Compose 컨테이너 구성

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