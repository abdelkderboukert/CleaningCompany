@ECHO off
WHERE /q node
IF %ERRORLEVEL% NEQ 0 ( ECHO "node wasn't found, installing nvm to install node" 

    curl -o "./nvm-install.exe"^
        --url "https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe" ^
        -L   ^
        -H "cache-control: no-cache"   ^
        -H "dnt: 1"   -H "pragma: no-cache"   ^
        -H "priority: u=0, i"   ^
        -H "sec-ch-ua-mobile: ?0"   ^
        -H "sec-ch-ua-platform: \"Windows\""   ^
        -H "sec-fetch-dest: document"   ^
        -H "sec-fetch-mode: navigate"   ^
        -H "sec-fetch-site: none"   ^
        -H "sec-fetch-user: ?1"   ^
        -H "upgrade-insecure-requests: 1"   ^
        -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0"^

    && ECHO now we will start installing nvm to install node, confirm the installation ^
    && nvm-install.exe ^
    && nvm install lts && nvm use lts) ^
ELSE ( ECHO node was found )

Rem lfo9a konna n installiw node(rem:comment)
Rem hna lta7t rana nmachiw l projet ta3 next
IF NOT EXIST build (
    ECHO build wasn't found, creating an optimized build
    npm update
    call npm run build 
) ELSE ECHO build was found

npm start
