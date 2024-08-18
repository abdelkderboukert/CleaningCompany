
if ! type "$node" > /dev/null; then
    echo "installing node fisrt"
    curl -o https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe
    starty 
fi
cd ./frontend
npm run build && npm start

/Scripts/activate
python manage.py