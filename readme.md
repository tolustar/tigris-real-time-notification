## Real-Time Notifications with Tigris

**Startup local Tigris development environment listening on port 8081**
```
docker run -d -p 8081:8081 tigrisdata/tigris-local:latest
```

**Clone the repo**
```
git clone https://github.com/tolustar/tigris-real-time-notification.git
cd tigris-real-time-notification
```

**Compile and start the application**
```
npm run build && npm run start 
```