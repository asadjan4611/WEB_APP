## Project Case Study: E‑Commerce Web App (Users, Sellers, Orders, Payments, Chat)

### 1) Executive Summary
This project is a full‑stack e‑commerce platform enabling shoppers to browse products and events, place orders, complete payments (Stripe, PayPal, COD), and chat with sellers in real time. Sellers manage shops, products, events, coupons, orders, and withdrawals. The system comprises:
- Backend API (Node.js/Express/MongoDB)
- Frontend SPA (React + Redux Toolkit, Vite)
- Realtime chat server (Socket.IO)
- Cloud services for media (Cloudinary) and payments (Stripe)

Business goals:
- Provide a smooth buyer experience (browse, cart, checkout, payment, order tracking).
- Provide seller tooling (onboarding, product/event publishing, order mgmt, withdrawals).
- Enable user–seller communication with realtime messaging.


### 2) Tech Stack
- Backend: Node.js, Express, Mongoose/MongoDB, JWT (cookie‑based), Cloudinary (images), Stripe (payments)
- Frontend: React (Vite), React Router, Redux Toolkit, React‑Toastify, Stripe Elements
- Realtime: Socket.IO (separate Node server)
- Tooling: Multer (multipart/form‑data), CORS, cookie‑parser, body‑parser, dotenv


### 3) High‑Level Architecture
- Client SPA (React) calls the REST API under `/api/*` for auth, catalog, checkout, and orders. Redux Toolkit manages client state. Stripe Elements securely handles card inputs. PayPal checkout is available via SDK.
- Node/Express backend exposes domain resources (`/api/user`, `/api/shop`, `/api/product`, `/api/event`, `/api/coupan`, `/api/order`, `/api/stripe`, `/api/conversation`, `/api/messages`, `/api/withDraw`). JWTs are issued into HTTP‑only cookies for users (`token`) and sellers (`seller_token`).
- MongoDB stores users, shops, products, events, orders, conversations, messages, coupons, withdrawals. Cloudinary stores media.
- A separate Socket.IO service manages realtime chat delivery and presence (user list).


### 4) Core Features
- User lifecycle: sign up, email activation, login, profile updates, avatar upload, addresses, password updates, logout.
- Seller lifecycle: seller sign up, email activation, login, profile & avatar mgmt, shop settings, withdraw methods, logout.
- Catalog: create/manage products, product gallery uploads, list all products and per‑shop products, product reviews and rating aggregation.
- Events: create/manage events with media, list all events and per‑shop events, delete events.
- Checkout & Orders: multi‑shop order splitting, status transitions, stock/sales accounting, refunds.
- Payments: Stripe payment intents, PayPal buttons, COD.
- Coupons: CRUD, validation by name, per‑seller listing.
- Messaging: conversations (group title per buyer–seller), messages with optional images, last‑message syncing; realtime delivery with Socket.IO.
- Payouts: withdraw requests for sellers and balance decrements.


### 5) Data Model Overview (Mongo/Mongoose)
- User (`Backened/model/user.js`)
  - name, email, password (bcrypt), phoneNumber
  - addresses[] (country, city, address1/2, zipCode, addressType)
  - avatar { public_id, url }, role=user, createdAt
  - instance methods: comparePassword, getJwtToken
- Shop (`Backened/model/shop.js`)
  - name, email, password (bcrypt), phoneNumber, zipCode, description, address
  - avatar { public_id, url }, role=seller
  - withdrawMethod, availableBalance, transections[]
  - instance methods: comparePassword, getJwtToken
- Product (`Backened/model/product.js`)
  - name, description, category, tags, originalPrice, discountPrice, stock
  - images[], shopeId, shop (Object), reviews[], rating, sold_out, createdAt
- Event (`Backened/model/event.js`)
  - product‑like fields + start/end date, status, images[], shopeId, shop, sold_out, createdAt
- Order (`Backened/model/order.js`)
  - cart[], shippingAddress, user(Object), totalPrice, status, paymentInfo, paidAt, deliveredAt, createdAt
- Conversation (`Backened/model/conversation.js`)
  - groupTitle, members[], lastMessage, lastMessageId, timestamps
- Messages (`Backened/model/messages.js`)
  - conversationId, text, sender, images { public_id, url }, timestamps
- CouponCode (`Backened/model/CouponCode.js`)
  - name, value, minAmount, maxAmount, seller(Object), selectedProduct, createdAt
- Withdraw (`Backened/model/withDraw.js`)
  - seller(Object), amount, status, createdAt, updatedAt


### 6) Backend API Design (Express)
Base URL: `${REACT_APP_BACKEND_URL}` (see frontend `serverRoute.js`).

- User (`/api/user`)
  - POST `/create-user` (multipart) → email activation link
  - POST `/activation`
  - POST `/login-user`
  - GET `/getUser` (auth)
  - GET `/logout` (auth)
  - PUT `/updateUserInfo` (auth)
  - PUT `/update-user-avatar` (multipart, auth)
  - PUT `/userAddressUpadte` (auth)
  - DELETE `/delete-address/:id` (auth)
  - PUT `/updatePassword` (auth)
  - GET `/user-info/:id`

- Shop (`/api/shop`)
  - POST `/create-shop` (multipart) → email activation
  - POST `/seller/activation`
  - POST `/shop-login`
  - GET `/getSeller` (seller‑auth)
  - GET `/logout-seller` (seller‑auth)
  - PUT `/update-seller-avatar` (multipart, seller‑auth)
  - GET `/get-shop-info/:id`
  - PUT `/updateSellerInfo` (seller‑auth)
  - GET `/seller-info/:id`
  - PUT `/update-payment-methods` (seller‑auth)
  - DELETE `/delete-withdraw-method` (seller‑auth)

- Product (`/api/product`)
  - POST `/create-product` (multipart) → Cloudinary images
  - GET `/get-all-products-shop/:id`
  - DELETE `/delete-shop-product/:id`
  - GET `/get-all-products`
  - PUT `/create-new-review` (auth) → rating aggregation + order item `isReviewed`

- Event (`/api/event`)
  - POST `/create-event` (multipart)
  - GET `/get-all-events-shop/:id`
  - DELETE `/delete-shop-event/:id`
  - GET `/get-all-events-shop`

- Order (`/api/order`)
  - POST `/create-order` → splits into per‑shop orders from a cart
  - GET `/getOrders/:id` (user orders)
  - GET `/getShopOrders/:shopId`
  - PUT `/update-order-status/:id` (seller‑auth) → stock/sales updates, seller balance credit, deliveredAt
  - PUT `/refund-order/:id`
  - PUT `/order-refund-success/:id` → stock reversed on refund success

- Payments (`/api/stripe`)
  - POST `/process` → Stripe PaymentIntent
  - GET `/stripeApiKey` → publishable key for Stripe Elements

- Coupons (`/api/coupan`)
  - POST `/create-coupan` (seller‑auth)
  - GET `/get-coupans/:id` (seller‑auth)
  - DELETE `/delete-coupan/:id` (seller‑auth)
  - GET `/coupan-verified/:name`

- Messaging (`/api/conversation`, `/api/messages`)
  - Conversation
    - POST `/create-new-conversation` (idempotent by `groupTitle`)
    - GET `/get-all-conversation-user/:id` (auth)
    - GET `/get-all-conversation-seller/:id` (seller‑auth)
    - PUT `/update-last-message/:id`
  - Messages
    - POST `/create-new-message` (optional images)
    - GET `/get-all-messages/:id`

- Withdraw (`/api/withDraw`)
  - POST `/create-withdraw-request` (seller‑auth) → reduces `availableBalance`


### 7) Authentication & Authorization
- JWT tokens issued to secure cookies:
  - User: `token` via `sendToken()`
  - Seller: `seller_token` via `sendShopToken()`
- Middleware:
  - `isAuthorized`: resolves `req.user` from JWT for users
  - `isSeller`: resolves `req.user` from JWT for sellers
- Activation Flow:
  - Signup creates an activation token signed with `ACTIVATION_SECRET` and emails an activation link. On activation, the user/seller is persisted and the login cookie is set.


### 8) Media Storage
- Cloudinary configured via environment variables.
- Uploads are handled via Multer to memory; then buffers are streamed to Cloudinary folders: `avatar`, `products`, `events`. Old avatars are deleted via `cloudinary.uploader.destroy(public_id)`.


### 9) Payments
- Stripe: The backend creates a PaymentIntent and returns `client_secret`. The frontend uses Stripe Elements for card collection and confirmation.
- PayPal: Frontend integrates `@paypal/react-paypal-js` to create/capture orders and posts a completed order to the backend.
- COD: Creates orders without online payment, marked with `paymentInfo.type = "Cash on Delivery"`.


### 10) Realtime Chat
- Dedicated Socket.IO server (`socket/index.js`) tracks connected users, relays messages to receivers, and broadcasts last‑message updates and online user lists.
- REST endpoints persist conversations and message history; realtime channel delivers live messages and updates.


### 11) Frontend Application
- Routing: `src/App.jsx` declares routes for user‑facing and seller‑dashboard flows. Protected routes guard authenticated pages; `ShopProtectedRoute` guards seller pages.
- State: Redux Toolkit store combines slices for `user`, `seller`, `products`, `events`, `cart`, `wishList`, `order`, `conversation`.
- Bootstrapping: On app load, it fetches products, events, and loads user/seller from cookies; also fetches Stripe publishable key.
- UI: Tailwind‑style utility classes across components; toasts for UX feedback.


### 12) Key User Flows
- User Signup & Activation
  1) POST `/api/user/create-user` with avatar to trigger activation email
  2) POST `/api/user/activation` to finalize account and set cookie
  3) Login via `/api/user/login-user` if needed

- Seller Signup & Activation
  1) POST `/api/shop/create-shop` with avatar to trigger activation email
  2) POST `/api/shop/seller/activation` to finalize and set seller cookie
  3) Manage shop via dashboard routes (protected)

- Product Creation
  1) Seller uploads images; backend streams to Cloudinary
  2) Product is stored with `shop` info, `images[]`, and metadata

- Checkout & Order Split
  1) Frontend aggregates cart across shops
  2) Backend creates per‑shop `Order` records from a single cart
  3) Sellers see only their respective orders; order status transitions update stock/sales and seller balances

- Payments
  - Stripe: Frontend requests `client_secret` from backend, then confirms payment via Elements
  - PayPal: Frontend creates & captures order, then persists backend order
  - COD: Directly persists order with `paymentInfo.type = COD`

- Refunds
  - Initiate with `/refund-order/:id`, finalize with `/order-refund-success/:id` which reverses stock/sales

- Messaging
  - Create or reuse a conversation by `groupTitle`
  - Persist messages via REST; deliver in realtime via Socket.IO
  - Last message updates broadcasted to participants

- Withdrawals
  - Seller requests withdrawal; available balance is decremented immediately


### 13) Environment Configuration
Set the following in backend `.env` (paths resolved in `server.js` / `cloudinary.js`):

```
PORT=5000
DB_URL=...
JWT_SECRET_KEY=...
JWT_EXPIRES=90d
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=...
STRIPE_APi_KEY=...              # publishable key returned by API
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ACTIVATION_SECRET=...
frontened_URL=http://localhost:5173
```

Frontend `.env` (Vite):
```
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_CHAT_SERVER_URL=http://localhost:4000
```

Socket server `.env`:
```
PORT=4000
```


### 14) Security Considerations
- HTTP‑only cookies for JWTs protect against XSS token theft.
- CORS restricted to `CLIENT_URL` and `credentials: true`.
- Password hashing via bcrypt; `select: false` on password fields.
- Image uploads stream directly to Cloudinary; old assets are deleted on avatar update.
- Validation/middleware present; consider adding centralized request validation (e.g., Joi/Zod) and rate limiting on auth/payment routes.


### 15) Performance & Scalability
- Horizontal scalability via stateless Express and separate Socket.IO server.
- Media offloaded to Cloudinary.
- Optimize DB reads with indexes on frequently queried fields (e.g., `user._id`, `cart.shopeId`, `groupTitle`).
- Consider pagination/endless scroll for product/event listings.


### 16) Observability & Ops (Next Steps)
- Add structured logging (pino/winston) and request logging (morgan).
- Health checks (`/ping`) already present.
- Add error tracking (Sentry) and metrics (Prometheus, Grafana) for API and socket server.


### 17) Known Gaps / Improvements
- Request validation and stronger error messages.
- Strengthen Message image handling (Cloudinary integration for chat media).
- Normalize `images` schema for messages; fix typos (`coupan`/`coupon`, `ShopeId`/`shopId`) for consistency.
- Add unit/integration tests for critical flows (auth, orders, payments).
- Add role‑based access for admin features.


### 18) Setup & Run
- Backend
  - `cd Backened`
  - Create `config/.env` with values above
  - `npm install`
  - `node server.js` (or `nodemon`)
- Frontend
  - `cd frontened/vite-project`
  - Create `.env` with URLs above
  - `npm install`
  - `npm run dev` (Vite on 5173 by default)
- Socket server
  - `cd socket`
  - Create `.env` with `PORT=4000`
  - `npm install`
  - `node index.js`


### 19) Conclusion
This system demonstrates an end‑to‑end commerce workflow with multi‑seller support, robust catalog management, checkout with multiple payment options, and realtime messaging. Clear separation of concerns (API, SPA, sockets) facilitates independent scaling and maintainability, while Cloudinary and Stripe reduce operational overhead for media and payments. The next iteration should focus on validation, test coverage, and administrative controls to harden the platform for production.


