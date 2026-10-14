# BURGESTA — sayt + admin panel

```
burgesta/
├── backend/    Java 21 · Spring Boot 3 · JPA · Flyway · Spring Security (menyu API va admin API)
└── frontend/   React 18 · Vite · GSAP · Lenis · three.js / React Three Fiber (sayt va /admin)
```

## Talablar

- **Java 21** (JDK) — Maven o‘rnatish shart emas, loyihada `mvnw` bor
- **Node.js 18+** va npm

## 1. Backendni ishga tushirish

```bash
cd backend
./mvnw spring-boot:run          # Windows: mvnw.cmd spring-boot:run
```

- API: http://localhost:8080/api/menu
- Birinchi ishga tushishda baza avtomatik yaratiladi va hozirgi **90 ta taom (10 ta bo‘lim)** yuklanadi
  (`src/main/resources/db/migration/V2__seed_menu.sql`).
- Lokal baza `backend/data/` papkasidagi H2 fayl. Admin panelda qilingan o‘zgarishlar qayta ishga tushirilganda ham saqlanib qoladi.
  Bazani boshidan boshlash uchun backendni to‘xtatib, `data/` papkasini o‘chiring.

**Admin login (lokal):** `admin` / `burgesta-admin`. Productionda albatta o‘zgartiring:

```bash
ADMIN_USERNAME=... ADMIN_PASSWORD=... ./mvnw spring-boot:run
```

Testlar: `./mvnw test`

## 2. Frontendni ishga tushirish

```bash
cd frontend
npm install
npm run dev
```

- Sayt: http://localhost:5173
- Admin panel: http://localhost:5173/admin

Dev rejimda Vite `/api` so‘rovlarini avtomatik ravishda `localhost:8080` ga yo‘naltiradi.

## Admin panelda nima qilsa bo‘ladi

- Taom qo‘shish, tahrirlash va o‘chirish (nomi uch tilda, narxi, og‘irligi, “Hit”/“Imzo” belgisi, tartib raqami)
- Taomni saytdan vaqtincha yashirish (“Saytda” tugmasi)
- Bo‘lim qo‘shish, tahrirlash va o‘chirish (ichida taom bor bo‘lim o‘chirilmaydi)

O‘zgarishlar saytda darhol ko‘rinadi (sahifani yangilang).

## API

| Metod | Yo‘l | Kirish |
|---|---|---|
| GET | `/api/menu` | ochiq — faqat ko‘rinadigan taomlar |
| GET | `/api/admin/me` | admin |
| GET, POST | `/api/admin/categories` | admin |
| PUT, DELETE | `/api/admin/categories/{id}` | admin |
| GET, POST | `/api/admin/items` | admin |
| PUT, DELETE | `/api/admin/items/{id}` | admin |
| PATCH | `/api/admin/items/{id}/availability` | admin |

Admin so‘rovlari HTTP Basic orqali himoyalangan. Xatolar RFC 7807 formatida qaytadi, validatsiya xatolari `errors` maydonida keladi.

## Internetga chiqarish

**Backend** (Render, Railway, VPS va h.k.) — PostgreSQL bilan `prod` profilida:

```bash
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=jdbc:postgresql://HOST:5432/burgesta
DATABASE_USERNAME=...
DATABASE_PASSWORD=...
ADMIN_USERNAME=...
ADMIN_PASSWORD=...
CORS_ALLOWED_ORIGINS=https://burgesta.netlify.app
```

Lokal PostgreSQL kerak bo‘lsa: `docker compose up -d` (fayl ildiz papkada).

**Frontend** (Netlify):

```bash
cd frontend
echo "VITE_API_URL=https://SIZNING-BACKEND-MANZILINGIZ" > .env
npm run build      # natija: frontend/dist
```

`dist` papkasini Netlify'ga yuklang. `/admin` sahifasi to‘g‘ri ochilishi uchun kerakli `_redirects` fayli allaqachon bor.
