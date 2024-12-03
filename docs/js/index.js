function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('collapsed');
  
  // 切換列表的顯示狀態
  const list = sidebar.querySelector('ul');
  if (sidebar.classList.contains('collapsed')) {
    list.style.display = 'none';
  } else {
    list.style.display = 'block';
  }

  // 同步調整主要內容區域的 margin-left
  const content = document.querySelectorAll('.content');
  content.forEach(element => {
    element.style.marginLeft = sidebar.classList.contains('collapsed') ? '60px' : '250px';
  });
}