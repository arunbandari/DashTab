const showTime = () => {
    $('#clock').html(`${new Date().getHours()}:${new Date().getMinutes()}`); // 11:18:48 AM
}
const listBookmarks = () => {
    chrome.bookmarks.getChildren('2', (bms) => {
        let uiBms = '';
        bms.forEach(bm => {
            uiBms += `<div class="item">
            <i class="large github middle aligned icon"></i>
            <div class="content">
              <a class="header">${bm.title}</a>
            </div>
          </div>`;
        });
        $('#bmList').html(uiBms);
    })
}
$(document).ready(function(){
    listBookmarks();
    setInterval(showTime, 1000);
    $("#addBookmark").click(function(){
        $('.ui.mini.modal')
        .modal({
            closable  : true,
            onApprove : function() {
                var $form = $('.content form'),
                bookmark = $form.form('get values');
                bookmark.parentId = 2;
                chrome.bookmarks.create(allFields, (response) => {
                    console.log(bookmark)
                });
            }
          })
        .modal('show');
    });
  });