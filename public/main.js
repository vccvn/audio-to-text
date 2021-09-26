
App.task(function () {
    function customFileChoose() {
        $(".custom-file-input").off();
        $(document).on("change", ".custom-file-input", function () {
            var t = $(this).val();
            var self = this;
            $(this).next(".custom-file-label").addClass("selected").html(t);

            var onc = $(self).data('on-change');
            var files = this.files;
            var callback = function (fs) {
                if (!fs) fs = [];
                if (onc) {
                    let oncbs = onc.split(',');
                    if (oncbs.length > 1) {
                        oncbs.forEach(element => {
                            let func = element.trim();
                            if (App.func.check(func)) {
                                App.func.call(func, [self, fs]);
                            }
                        });

                    }
                    else if (App.func.check(onc)) {
                        App.func.call(onc, [self, fs]);
                    }

                }
            };
            if (window.File && window.FileList && files && files.length) {
                var list = [];
                var lsName = [];
                let max = files.length - 1;
                for (var i = 0; i < files.length; i++) {
                    let file = files[i];
                    lsName.push(file.name);
                    if (onc && window.FileReader) {
                        (function (file, index, coumt) {
                            let fileReader = new FileReader();
                            fileReader.onload = function (f) {
                                let src = f.target.result;
                                let data = {
                                    filename: file.name,
                                    size: file.size,
                                    data: src
                                };

                                list.push(data);
                                if (index == coumt) {
                                    callback(list);
                                }
                            };
                            fileReader.readAsDataURL(file);
                        })(file, i, max);
                    }
                    if (i == max) {
                        $(self).next(".custom-file-label").addClass("selected").html(lsName.join(', '));
                    }

                }
            } else {
                callback([]);
            }
        });
    }
    customFileChoose();
})
var resultDom = document.getElementById("text-result");
var formUpload = document.getElementById("upload-form");
formUpload.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData();
    var audiofile = document.querySelector('#audiofile');
    var lang = document.getElementById("language").value;
    if (!audiofile.files.length) {
        Swal.fire({
            icon: 'warning',
            title: 'Cảnh báo',
            text: 'Bạn chưa chọn file'
        })
        return false
    }

    formData.append("audiofile", audiofile.files[0]);
    formData.append("lang", lang);
    resultDom.innerText = "";
    Swal.fire({
        title: 'Đang tải',
        html: 'Vui lòng chờ giây lát',
        timer: 9999999,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            
        },
        willClose: () => {
            
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })

    axios.post('http://103.237.145.120:1998/api/upload-and-convert', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(function (res) {
        Swal.close();
        if(!res.data || !res.data.status){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Không có kết quả'
            });
            
        }
        else{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Chuyển file thành công!'
              });
              
              resultDom.innerText = res.data.content
              
        }
        
    }).catch((err) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Lỗi không xác định!'
        })
        console.log(err)
    })
    return false;
}, false)
