/**
 * SCCS Course Planner PWA service worker
 * Adapted from PWABuilder "Offline copy of pages" template
 *
 * Functions:
 * - offline page cache
 * - push notif server
 * - more to come!
 */

const CACHE = "sccs-planner";

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

/* Cache */
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp("/*"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  })
);

/* Push Notifs */
self.addEventListener("push", function (event) {
  if (event.data) {
    let body;
    try {
        const data = event.data.json();
        body = data.body;
        icon = data.icon || "/icon.png";
    } catch (e) {
        console.log("clearly not a JSON notif");
        body = event.data;
        icon = "/icon.png";
    }

    const options = {
      body: body,
      icon: icon,
      badge: "/icon.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.");
  event.notification.close();
  event.waitUntil(clients.openWindow("<https://your-website.com>"));
});
