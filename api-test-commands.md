# API Testing Commands

## Test Register Player Endpoint

### 1. Register a new player (POST)
```powershell
Invoke-RestMethod -Uri "https://scytheclient.com/api/client/register-player" -Method POST -ContentType "application/json" -Body '{"ign":"TestPlayer","uuid":"test-uuid-123","hwid":"test-hwid-456"}'
```

### 2. Register same player with updated IGN (POST - tests IGN update fix)
```powershell
Invoke-RestMethod -Uri "https://scytheclient.com/api/client/register-player" -Method POST -ContentType "application/json" -Body '{"ign":"UpdatedPlayerName","uuid":"test-uuid-123","hwid":"test-hwid-456"}'
```

### 3. Disconnect player (DELETE)
```powershell
Invoke-RestMethod -Uri "https://scytheclient.com/api/client/register-player" -Method DELETE -ContentType "application/json" -Body '{"uuid":"test-uuid-123"}'
```

### 4. Register player again to verify they can log back in (POST)
```powershell
Invoke-RestMethod -Uri "https://scytheclient.com/api/client/register-player" -Method POST -ContentType "application/json" -Body '{"ign":"FinalTest","uuid":"test-uuid-123"}'
```

## Expected Results

### POST - New Player
- `success: true`
- Returns player object with provided IGN, UUID, HWID
- `isOnline: true`

### POST - Existing Player
- `success: true`
- IGN updates to new value
- `isOnline: true`
- `lastSeen` updates to current time

### DELETE - Disconnect
- `success: true`
- Player marked as offline in database

## Testing with Different Tool (curl alternative)

If you have curl installed:
```bash
curl -X POST https://scytheclient.com/api/client/register-player -H "Content-Type: application/json" -d '{"ign":"TestPlayer","uuid":"test-uuid-123","hwid":"test-hwid-456"}'
```
