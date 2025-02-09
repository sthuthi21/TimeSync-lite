#!/bin/bash
exec gunicorn --bash 0.0.0.0:5001 backend.app:app