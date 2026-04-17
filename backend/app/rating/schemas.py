from pydantic import BaseModel, Field
from typing import Optional


class RatingCreateSchema(BaseModel):
    rating: int = Field(..., ge=1, le=5)

    honesty: str

    recommend: str

    comments: Optional[str] = None