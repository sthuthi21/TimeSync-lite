#!/bin/bash
exec gunicorn -b 0.0.0.0:5001 backend/app:appbash