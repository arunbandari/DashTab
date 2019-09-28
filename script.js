const showTime = () => {
    const hours = new Date().getHours().toString().padStart(2,0);
    const minutes = new Date().getMinutes().toString().padStart(2,0);
    $('#clock').html(`${hours}:${minutes}`); // 21:04
}
const listBookmarks = () => {
    chrome.bookmarks.getChildren('2', (bms) => {
        let uiBms = '';
        bms.forEach(bm => {
            uiBms += `<div class="item">
            <i class="large middle aligned icon"><img src="chrome://favicon/${bm.url}"></i>
            <div class="content">
              <a class="header inline" href="${bm.url}" target="_blank">${bm.title}  <span class="ui mini label">${bm.url}</span></a>
            </div>
            <i class="aligned large pen square icon secondary middle" style="color:#ddd"></i>
          </div>`;
        });
        $('#bmList').html(uiBms);
    })
}
$(document).ready(function(){
    showTime();
    listBookmarks();
    setInterval(showTime, 1000);
    $("#addBookmark").click(function(){
        $('.ui.mini.modal')
        .modal({
            closable  : true,
            onApprove : function() {
                var $form = $('.content form'),
                bookmark = $form.form('get values');
                bookmark.parentId = '2';
                chrome.bookmarks.create(bookmark, (response) => {
                  listBookmarks();
                });
            }
          })
        .modal('show');
    });
  });