from fastapi import WebSocket, WebSocketDisconnect
from jose import jwt, JWTError
from .router import router

# IMPORTANT: import SAME key used in login token
from app.auth.utils import SECRET_KEY, ALGORITHM


@router.websocket("/ws/notifications")
async def websocket_notifications(websocket: WebSocket):

    token = websocket.query_params.get("token")

    if not token:
        print("❌ No token received")
        await websocket.close(code=1008)
        return

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("user_id")

        if not user_id:
            print("❌ user_id missing in token")
            await websocket.close(code=1008)
            return

        print("✅ WebSocket authenticated:", user_id)

        await websocket.accept()

    except JWTError as e:
        print("❌ JWT decode error:", str(e))
        await websocket.close(code=1008)
        return


    try:
        while True:
            await websocket.send_json({
                "message": "Connected successfully",
                "user_id": user_id
            })

    except WebSocketDisconnect:
        print("Client disconnected:", user_id)