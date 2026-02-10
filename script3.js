const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const shutter = document.getElementById('shutter');
const frameImg = document.getElementById('frame');
const resultDiv = document.getElementById('result');
const downloadBtn = document.getElementById('download-btn');
const downloadLink = document.getElementById('download-link');

// 1. カメラの起動
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("カメラの起動に失敗しました: ", err);
        alert("カメラの使用を許可してください");
    });

// 2. 撮影処理
shutter.addEventListener('click', () => {
    const context = canvas.getContext('2d');
　　canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    
    // 撮影結果の表示（ここは今のままでOK）
    const newImg = document.createElement('img');
    newImg.src = dataUrl;
    newImg.style.width = "100%";
    resultDiv.innerHTML = "<h3>撮影完了！</h3>";
    resultDiv.appendChild(newImg);

    // --- ここから追加：保存ボタンの設定 ---
    downloadLink.href = dataUrl;
    downloadLink.download = 'my-photo.png'; // 保存されるファイル名
    downloadBtn.style.display = 'block';    // 保存ボタンを表示する
});

// 保存ボタンを押した時の動き
downloadBtn.addEventListener('click', () => {
    downloadLink.click(); // 隠しリンクをプログラムでクリックして保存を実行
    
    // キャンバスのサイズをビデオに合わせる
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // ビデオ映像を描画
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // フレームを描画
    context.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

    // 画像として書き出し
    const dataUrl = canvas.toDataURL('image/png');
    const newImg = document.createElement('img');
    newImg.src = dataUrl;
    newImg.style.width = "100%";
    
    resultDiv.innerHTML = "<h3>撮影結果:</h3>";
    resultDiv.appendChild(newImg);
});