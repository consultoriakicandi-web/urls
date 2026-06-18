import os
from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI()

# Sua lógica do pipeline roda aqui ou em segundo plano
def seu_pipeline_supabase():
    print("Processando dados e enviando para o Supabase...")

# Rota que o TikTok vai acessar para validar que a URL funciona
@app.get("/")
def home():
    return {"status": "Pipeline ativo"}

# Se o TikTok pedir um arquivo de assinatura específico:
@app.get("/tiktok-verification-file.txt", response_class=PlainTextResponse)
def verificar_tiktok():
    return "CONTEÚDO_DA_ASSINATURA"
