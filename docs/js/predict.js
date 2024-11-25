function showName() {
    // 獲取輸入框的值
    const pitcherName = document.getElementById("pitcherName").value;
    const hitterName = document.getElementById("hitterName").value;

    // 顯示輸入的姓名
    const displayName = document.getElementById("displayName");
    displayName.textContent = `Hello, ${pitcherName} ${hitterName}!`;
  }