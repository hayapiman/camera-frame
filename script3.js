const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const shutter = document.getElementById('shutter');
const frameImg = document.getElementById('frame');
const resultDiv = document.getElementById('result');

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