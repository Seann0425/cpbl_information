document.getElementById("predictForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // 防止表單自動刷新

  const pitcherName = document.getElementById("pitcherName").value.trim();
  const hitterName = document.getElementById("hitterName").value.trim();

  if (!pitcherName || !hitterName) {
    alert("Please enter both pitcher and hitter names.");
    return;
  }

  try {
    // 從後端 API 獲取數據
    const battersResponse = await fetch("http://localhost:3000/batters");
    const pitchersResponse = await fetch("http://localhost:3000/pitchers");
    console.log(battersResponse)
    if (!battersResponse.ok || !pitchersResponse.ok) {
      throw new Error("Failed to fetch data from server.");
    }

    const batters = await battersResponse.json();
    console.log(batters)
    const pitchers = await pitchersResponse.json();

    // 查找打者和投手資料
    const batter = batters.find((b) => b.name === hitterName);
    const pitcher = pitchers.find((p) => p.name === pitcherName);

    if (!batter) {
      alert(`Hitter ${hitterName} not found.`);
      return;
    }

    if (!pitcher) {
      alert(`Pitcher ${pitcherName} not found.`);
      return;
    }

    // 計算對決指數
    const parkFactor = 1; // 預設場地因子
    const duelIndex = (batter.ops_plus / 100) * (100 / pitcher.era_plus) * parkFactor;

    // 簡單的結論
    let conclusion = "";
    if (duelIndex > 1.1) {
      conclusion = "Batter has the advantage!";
    } else if (duelIndex < 0.9) {
      conclusion = "Pitcher has the advantage!";
    } else {
      conclusion = "It's a balanced matchup.";
    }

    // 更新結果到頁面
    document.getElementById("duelIndex").textContent = `Duel Index: ${duelIndex.toFixed(3)}`;
    document.getElementById("batterOpsPlus").textContent = `Batter OPS+: ${batter.ops_plus}`;
    document.getElementById("pitcherEraPlus").textContent = `Pitcher ERA+: ${pitcher.era_plus}`;
    document.getElementById("conclusion").textContent = conclusion;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("An error occurred while processing your request. Please try again later.");
  }
});