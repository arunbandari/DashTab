const showTime = () => {
    const hours = new Date().getHours().toString().padStart(2,0);
    const minutes = new Date().getMinutes().toString().padStart(2,0);
    $('#clock').html(`${hours}:${minutes}`); // 21:04
}
const showBookmarkModal = () => {
    $('.ui.mini.modal')
    .modal({
        closable  : true,
        onApprove : function() {
            const $form = $('.content form'),
            bookmark = $form.form('get values');
            bookmark.parentId = '2';
            const id = bookmark.id;
            delete bookmark.id;
            if (id) {
                chrome.bookmarks.update(id, { title: bookmark.title, url: bookmark.url }, (response) => {
                    listBookmarks();
                });  
            } else {
                chrome.bookmarks.create(bookmark, (response) => {
                    listBookmarks();
                });
            }
        }
      })
    .modal('show');
};
const listBookmarks = () => {
    chrome.bookmarks.getChildren('2', (bms) => {
        let uiBms = '';
        bms.forEach(bm => {
            uiBms += `<div class="item">
            <i class="large middle aligned icon"><img src="chrome://favicon/${bm.url}"></i>
            <div class="content">
              <a class="header inline" href="${bm.url}" target="_blank">${bm.title} <span class="ui primary mini label">${bm.url}</span></a>
            </div>
            <i class="aligned small edit outline icon secondary middle" bId="${bm.id}" id="editBm" style="color:#ddd"></i>
            <i class="aligned small trash icon secondary middle" bId="${bm.id}" id="editBm" style="color:#ddd"></i>
          </div>`;
        });
        $('#bmList').html(uiBms);
    })
}
$(document).ready(function(){
    showTime();
    listBookmarks();
    setInterval(showTime, 1000);
    $("#addBookmark").click(() => {
        $('.content form')
         .form('set values', {title: '', url: '', id: ''});
        showBookmarkModal();
    });
    $(document).on('click','#editBm',function(event){
        const element = event.target;
        const id = element.getAttribute('bid');
        chrome.bookmarks.get(id, (bm) => {
            console.log(bm[0])
            $('.content form')
             .form('set values', bm[0]);
            showBookmarkModal();
        })
    });
  });