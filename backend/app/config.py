from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    AI_SERVICE_URL: str = "http://localhost:9000/rag"
    ALLOW_ORIGINS: list[str] = ["http://localhost:3000"]
    ENV: str = "dev"

    MONGO_URI: str
    MONGO_DB: str

    JWT_SECRET: str | None = None
    BCRYPT_SALT: int | None = None

    model_config = SettingsConfigDict(
        env_file=".env.local",
        env_file_encoding="utf-8"
    )

@lru_cache()
def get_settings() -> Settings:
    return Settings()
