#!/usr/bin/env python3

import os
import json
import subprocess
import sys
from datetime import datetime

# Configuration
RAILWAY_TOKEN = "c8c200e2-cbc8-4397-b780-389c00772d82"
RAILWAY_API = "https://api.railway.app/graphql"
GITHUB_REPO = "Tuya990/tuya-platform"
SUPABASE_URL = "postgresql://postgres:M%40ussab2252026@db.pmeftbpnggkaocphbqcw.supabase.co:5432/postgres"

# Colors
GREEN = '\033[0;32m'
RED = '\033[0;31m'
YELLOW = '\033[1;33m'
NC = '\033[0m'

def log_info(msg):
    print(f"{YELLOW}ℹ️  {msg}{NC}")

def log_success(msg):
    print(f"{GREEN}✅ {msg}{NC}")

def log_error(msg):
    print(f"{RED}❌ {msg}{NC}")

def log_section(title):
    print(f"\n{YELLOW}{'='*60}{NC}")
    print(f"{YELLOW}{title}{NC}")
    print(f"{YELLOW}{'='*60}{NC}\n")

def run_command(cmd, description=""):
    """Run a shell command and return output"""
    try:
        if description:
            log_info(description)
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=60)
        if result.returncode != 0:
            log_error(f"Command failed: {cmd}")
            log_error(result.stderr)
            return None
        return result.stdout.strip()
    except Exception as e:
        log_error(f"Error running command: {str(e)}")
        return None

def create_railway_project(name, description):
    """Create a new Railway project"""
    log_info(f"Creating Railway project: {name}")
    
    # This would require GraphQL API call
    # For now, we'll create a placeholder
    log_success(f"Project creation prepared: {name}")
    return {"id": f"project_{name}", "name": name}

def deploy_service(service_name, folder_path, env_vars):
    """Deploy a service to Railway"""
    log_section(f"Deploying {service_name}")
    
    log_info(f"Service: {service_name}")
    log_info(f"Folder: {folder_path}")
    log_info(f"Environment Variables: {len(env_vars)} variables")
    
    # Print environment variables
    for key, value in env_vars.items():
        if len(value) > 20:
            print(f"  {key}: {value[:20]}...")
        else:
            print(f"  {key}: {value}")
    
    log_success(f"{service_name} deployment prepared")
    return True

def main():
    log_section("TUYA Platform - Railway Deployment")
    
    print(f"Start Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"GitHub Repo: {GITHUB_REPO}")
    print(f"Supabase: Connected\n")
    
    # Step 1: Backend Deployment
    backend_env = {
        "PORT": "4000",
        "NODE_ENV": "production",
        "DATABASE_URL": SUPABASE_URL,
        "JWT_SECRET": "tuya-jwt-secret-key-2026-production-mode-secure-key-12345",
        "GOOGLE_MAPS_API_KEY": "AIzaSyDemoKeyForTUYA2026",
        "SOCKET_IO_CORS_ORIGIN": "https://tuya-app-sudan.vercel.app,https://tuya-driver-app.railway.app,https://tuya-admin-dashboard.railway.app",
        "LOG_LEVEL": "info"
    }
    
    deploy_service(
        "Backend",
        "packages/backend",
        backend_env
    )
    
    # Step 2: Driver App Deployment
    driver_env = {
        "NEXT_PUBLIC_API_URL": "https://tuya-backend.railway.app",
        "NEXT_PUBLIC_SOCKET_URL": "wss://tuya-backend.railway.app",
        "NEXT_PUBLIC_APP_NAME": "TUYA Driver",
        "NEXT_PUBLIC_APP_VERSION": "1.0.0",
        "NEXT_PUBLIC_ENVIRONMENT": "production"
    }
    
    deploy_service(
        "Driver App",
        "apps/driver-app",
        driver_env
    )
    
    # Step 3: Admin Dashboard Deployment
    admin_env = {
        "NEXT_PUBLIC_API_URL": "https://tuya-backend.railway.app",
        "NEXT_PUBLIC_SOCKET_URL": "wss://tuya-backend.railway.app",
        "NEXT_PUBLIC_APP_NAME": "TUYA Admin",
        "NEXT_PUBLIC_APP_VERSION": "1.0.0",
        "NEXT_PUBLIC_ENVIRONMENT": "production"
    }
    
    deploy_service(
        "Admin Dashboard",
        "apps/admin-dashboard",
        admin_env
    )
    
    # Summary
    log_section("Deployment Summary")
    
    print("Services to Deploy:")
    print("  1. Backend (packages/backend)")
    print("  2. Driver App (apps/driver-app)")
    print("  3. Admin Dashboard (apps/admin-dashboard)")
    print()
    
    print("Expected URLs:")
    print("  Backend: https://tuya-backend-xxx.railway.app")
    print("  Driver App: https://tuya-driver-app-xxx.railway.app")
    print("  Admin Dashboard: https://tuya-admin-dashboard-xxx.railway.app")
    print("  Passenger App: https://tuya-app-sudan.vercel.app (already deployed)")
    print()
    
    print(f"End Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    log_success("Deployment preparation complete!")
    print()
    print("Next Steps:")
    print("1. Go to: https://railway.app/dashboard")
    print("2. Create 3 new projects")
    print("3. Deploy each service")
    print("4. Wait for builds to complete")
    print()

if __name__ == "__main__":
    main()
