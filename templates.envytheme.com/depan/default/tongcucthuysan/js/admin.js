var _gloTimer;
var _gloAjaxBusy = false;
var _gloTimeout = 1000;
var _cache = {}, _lastXhr;
var _NPM = '';
function calTime() {
    var d = new Date();
    var a = ('../default.aspx?ref=' + Math.random() + 'time =' + d.getTime.toString)
    return ('../default.aspx?ref=' + Math.random() + d.getTime().toString());
}

var adm = {
    urlDefault: calTime().toString(),
    urlDefault0: '.plugin?ref=' + Math.random(),
    urlDefault1: 'Default.aspx?ref=' + Math.random(),
    urlDefault2: '../admin/Default.aspx?ref=' + Math.random(),
    qframemessenger: function (icon, text, fn) {
        var newDlg = $('#global-dialog-messenger');
        if ($(newDlg).length < 1) {
            $('body').append('<div id=\"global-dialog-messenger\"></div>');
            newDlg = $('#global-dialog-messenger');
        }
        // $(newDlg).dialog({
        //     modal: true,
        //     width: 360,
        //     height: 160,
        //     title: 'Q-eOffice - THÔNG BÁO',
        //     buttons: {
        //         'Đóng': function () {
        //             $(newDlg).dialog('close');
        //         }
        //     },
        //     open: function () {
        //         $(newDlg).html('<div style="text-align:center;"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr ><td style="padding:10px 0 0 5px;width:50px;"><img style="height:45px;width:45px;pading-left:-20px;pading-top:20px" src="../css/redmond/i/' + icon + '.png" alt="' + icon + '"/></td><td style="text-align:left;padding:0 0 0 20px;font-size:14px;font-family:tahoma !important">' + text + '</td></tr></tbody></table></div>');
        //         if (icon == 'question') {
        //             var btn = {};
        //             $.extend(btn,
        //             { // Mở rộng nút bấm
        //                 'Đồng ý': function () {
        //                     $(newDlg).dialog('close');
        //                     if (typeof (fn) == 'function') {
        //                         fn();
        //                     }
        //                     return true;
        //                 },
        //                 'Hủy bỏ': function () {
        //                     $(newDlg).dialog('close');
        //                     return false;
        //                 }
        //             });
        //             $(newDlg).dialog('option', 'buttons', btn);
        //         }
        //     }
        // });
    },
    LoadPopPlugin: function (el) {
        var htm = '<div id="LoadPopPlugin-popBaoCaoNhanh-Dlg"><div class="Title" style="font-family:Times;color:black;padding-top: 10px;font-size:20px;font-weight:bold;text-align:center;"></div><div class="NoiDung"></div></div>';
        if ($('#LoadPopPlugin-popBaoCaoNhanh-Dlg').length < 1) {
            $('body').append(htm);
        }
        var _url = $(el).attr('_url');
        var title = $(el).attr('title');
        var fn_id = $(el).attr('_fn_id');
        _height = $(window).height();
        $('#LoadPopPlugin-popBaoCaoNhanh-Dlg').dialog({
            title: title.toUpperCase(),
            modal: true,
            width: $(window).width(),
            height: _height,
            buttons: {
                'Đóng': function () {
                    $('#LoadPopPlugin-popBaoCaoNhanh-Dlg').dialog('close');
                }
            },
            open: function () {
                console.log(title);
                adm.loadPlug(_url, { 'fn_id': fn_id, 'fn_mota': title, 'fn_ma': '', mota_baocao: title }, function (data) {
                    $('#LoadPopPlugin-popBaoCaoNhanh-Dlg').find('.Title').html(title);
                    $('#LoadPopPlugin-popBaoCaoNhanh-Dlg').find('.NoiDung').html(data);
                    $('#LoadPopPlugin-popBaoCaoNhanh-Dlg').find('.NoiDung').find('.portlet-body').css('overflow', 'none');
                });
            }
        });
    },
    PrintView: function (_title, request) {
        var __height = $(window).height() * 0.95;
        var __width = $(window).width() * 0.95;
        htm = '<div id="FrameView" width="' + __width + '" height="' + __height + '"><iframe ID="RptReport" width="100%" height="100%"  src="' + request + '"></iframe></div>';
        if ($('#FrameView').length < 1) {
            $('body').append(htm);
        } else {
            $('iframe', '#FrameView').attr('src', request);
        }
        $('#FrameView').dialog({
            title: _title,
            width: __width,
            height: __height,
            modal: true,
            buttons: {
                'Đóng': function () {
                    $('#FrameView').dialog('close');
                }
            },
            open: function () {
            }
        });
    },
    GetReload: function () {
        var obj = $('div.ui-tabs-panel', '#tabs').not('.ui-tabs-hide');
        preload.reloadplugin(obj);

    },
    isEmail: function (email) {
        var status = false;
        var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (email.search(emailRegEx) == -1) {
            status = false;
        } else {
            status = true;
        }
        return status;
    },


    loadPlug: function (plug, param, fn) {
        // if (plug == '' || plug == null) {
        //     alert('THÔNG BÁO \nModule này đang xây dựng \nAnh/Chị quay lại sau.');
        //     return false;
        // }
        // var defaultParam = { 'act': 'loadPlug', 'rqPlug': plug };
        // param = $.extend(defaultParam, param);
        // //adm.loading('Đang nạp <b>' + plug + '</b>');
        // // adm.loading('Đang tải');
        // $.post(adm.urlDefault, param, function (data) {
        //     adm.loading(null);
        //     if (typeof (fn) == 'function') {
        //         fn(data);
        //     }
        // });
    },
    styleButtonNextPreview: function (el) {
        if ($(el).length > 1) {
            $(el).button();
        }
        $('.mdl-head-btn').button();

        $('.admnext-btn').html('&nbsp;');
        $('.admnext-btn').button({
            icons: {
                primary: 'ui-icon-triangle-1-e'
            },
            text: false
        });
        $('.admpreview-btn').html('&nbsp;');
        $('.admpreview-btn').button({
            icons: {
                primary: 'ui-icon-triangle-1-w'
            },
            text: false
        });
        $('.admSearch-btn').html('&nbsp;');
        $('.admSearch-btn').button({
            icons: {
                primary: 'ui-icon-search'
            },
            text: false
        });
        $('.admfilter-btn').unbind('click').click(function () {
            var item = $(this);
            $(item).prev().autocomplete('search', '');
            $(item).prev().focus();
        });
        $('.admfilter-btnDate').unbind('click').click(function () {

            var item = $(this);
            $(item).prev().datepicker('show');
        });
        $('.mdl-head-btn').find('.ui-button-text').css('float', 'left');
    },
    preload: function () {
        window.defaultOnError = window.onerror;
        window.onerror = function (errorMeaage, fileName, lineNumber) {
            adm.loading('00x014 MSG:' + errorMeaage + ' FILE:' + fileName + ' LINE:' + lineNumber, function () {
                adm.highlight($('#adm-loading'), function () {
                    setTimeout(function () {
                        adm.loading(null);
                    }, 10000);
                });
            });
            return true;
        }
        jQuery(function ($) {
            $.datepicker.regional['vi'] = {
                closeText: 'Đóng',
                prevText: '&#x3c;Trước',
                nextText: 'Tiếp&#x3e;',
                currentText: 'Hôm nay',
                monthNames: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu',
                    'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'],
                monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
                dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                weekHeader: 'Tu',
                dateFormat: 'dd/mm/yy',
                firstDay: 0,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };
            $.datepicker.setDefaults($.datepicker.regional['vi']);
        });
        adm.setupAjax();
        $('body').append('<div id=\"adm-loading-panel\"><div id=\"adm-loading-panel-box\"><span class=\"ui-widget ui-widget-content ui-corner-all\" id=\"adm-loading\"></span></div></div>');
        // adm.loading('Khởi động');
        (function ($) {

            $(".ui-autocomplete-input").live("autocompleteopen", function () {
                var autocomplete = $(this).data("autocomplete"),
                    menu = autocomplete.menu;

                if (!autocomplete.options.selectFirst) {
                    return;
                }

                menu.activate($.Event({ type: "mouseenter" }), menu.element.children().first());
            });

        } (jQuery));
        $.post(adm.urlDefault, { 'act': 'loadPlug', 'rqPlug': 'docsoft.hethong.preload.Class1, docsoft.hethong.preload' }, function (data) {
            adm.loading(null);
        }, 'script');
        (function ($) {

            $(".ui-autocomplete-input").live("autocompleteopen", function () {
                var autocomplete = $(this).data("autocomplete"),
                    menu = autocomplete.menu;

                if (!autocomplete.options.selectFirst) {
                    return;
                }

                menu.activate($.Event({ type: "mouseenter" }), menu.element.children().first());
            });

        } (jQuery));

    },
    autoTuoi: function (el, fn) {
        var dotuoi = $(el);
        var year = [];

        for (var i = 18; i <= 60; i++) {
            year[i - 18] = "" + i + "";
        }
        $(dotuoi).autocomplete({
            source: function (request, response) {
                response($.map(year, function (item) {
                    return {
                        label: item,
                        _value: item
                    }
                }))
            },
            minLength: 0,
            delay: 0,
            selectFirst: true,
            select: function (event, ui) {
                fn(event, ui);
            }
        });
        $(dotuoi).unbind('click').click(function () {
            $(nam).autocomplete({
                source: year,
                minLength: 0,
                delay: 0,
                selectFirst: true
            });
        });
    },
    autoYear: function (el, fn) {
        var now = new Date();
        var _year = $(el);
        var year = [];
        for (var i = now.getFullYear(); i >= 1952; i--) {
            year[now.getFullYear() - i] = "" + i + "";
        }
        $(_year).autocomplete({
            source: function (request, response) {
                response($.map(year, function (item) {
                    return {
                        label: item,
                        _value: item
                    }
                }))
            },
            minLength: 0,
            delay: 0,
            selectFirst: true,
            select: function (event, ui) {
                fn(event, ui);
            }
        });

        //$(_year).unbind('click').click(function () {
        //    $(_year).autocomplete({
        //        source: year,
        //        minLength: 0,
        //        delay: 0,
        //        selectFirst: true
        //    });
        //});

        $(el).unbind('click').click(function () {
            $(el).autocomplete('search', '');
        });


    },
    autoGioiTinh: function (el, fn) {
        var listType = [
            { ten: "--Tất cả--", value: 2 },
            { ten: "Nam", value: 1 },
            { ten: "Nữ", value: 0 }
        ];

        $(el).autocomplete({
            source: function (request, response) {
                response($.map(listType, function (item) {
                    return {
                        label: item.ten,
                        _value: item.value
                    };
                }));
            },
            minLength: 0,
            delay: 0,
            selectFirst: true,
            select: function (event, ui) {
                fn(event, ui);
            }
        });
    },
    autoTrangThaiXacThuc: function (el, fn) {
        var listType = [
            { ten: "--Tất cả--", value: 2 },
            { ten: "Đã xác thực", value: 1 },
            { ten: "Chưa xác thực", value: 0 }
        ];

        $(el).autocomplete({
            source: function (request, response) {
                response($.map(listType, function (item) {
                    return {
                        label: item.ten,
                        _value: item.value
                    };
                }));
            },
            minLength: 0,
            delay: 0,
            selectFirst: true,
            select: function (event, ui) {
                fn(event, ui);
            }
        });
    },
    //hiennb
    genComBo: function (el, ListType, fn) {
        $(el).autocomplete({
            source: function (request, response) {
                response($.map(ListType, function (item) {
                    return {
                        label: item.Ten,
                        value: item.Ten,
                        ma: item.value
                    };
                }));
            },
            minLength: 0,
            delay: 0,
            selectFirst: true,
            select: function (event, ui) {
                fn(event, ui);
            }
        });
    },

    loadTabs: function () {
        jQuery.each(jQuery('.CongViec-tabs-home-header-item'), function (i, _item) {
            var item = jQuery(_item);
            item.click(function () {
                item.parent().find('.CongViec-tabs-home-header-item-focus').removeClass('CongViec-tabs-home-header-item-focus');
                item.addClass('CongViec-tabs-home-header-item-focus');
                item.parent().next().find('.CongViec-tabs-home-body-focus').removeClass('CongViec-tabs-home-body-focus');
                item.parent().next().find('.CongViec-tabs-home-body').eq(i).addClass('CongViec-tabs-home-body-focus');
            });
        });
    },
    ConfirmDelete: function (mesage, fn) {
        var newDlg = $('#global-dialog-ConfirmDelete');
        if ($(newDlg).length < 1) {
            $('body').append('<div id=\"global-dialog-ConfirmDelete\"></div>');
            newDlg = $('#global-dialog-ConfirmDelete');
        }

        // $(newDlg).dialog({
        //     title: 'THÔNG BÁO',
        //     width: 400,
        //     modal: true,
        //     buttons: {
        //         'Có': function () {
        //             if (typeof (fn) == 'function') {
        //                 fn(1);
        //             }
        //             $(newDlg).dialog('close');
        //             //                        danhmuc.save(false, function () {
        //             //                            $(newDlg).dialog('close');
        //             //                        });
        //         },
        //         'Không': function () {
        //             if (typeof (fn) == 'function') {
        //                 fn(0);
        //             }
        //             $(newDlg).dialog('close');
        //         }
        //     },
        //     open: function () {
        //         adm.styleButton();
        //         $(newDlg).html(mesage);
        //     }
        // });

    },
    validFn: function (data) {
        var dt = eval(data);
        //        $.each(dt, function (i, item) {
        //            if (!item.Active) {
        //                $('#' + item.Ma).remove();
        //            }
        //        });
    },

    styleButton: function (el) {
        if ($(el).length > 1) {
            $(el).button();
        }

        $('.mdl-head-btn').button();

        $('.admfilter-btn').html('&nbsp;');
        $('.admfilter-btn').button({
            icons: {
                primary: 'ui-icon-triangle-1-s'
            },
            text: false
        });
        $('.admfilternew-btn').html('&nbsp;');
        $('.admfilternew-btn').button({
            icons: {
                primary: 'ui-icon-triangle-1-s-new'
            },
            text: false
        });

        $('.admSearch-btn').html('&nbsp;');
        $('.admSearch-btn').button({
            icons: {
                primary: 'ui-icon-search'
            },
            text: false
        });

        $('.admfilternew-btn').unbind('click').click(function () {
            var item = $(this);
            if ($(item).prev().autocomplete("widget").is(":visible")) {
                $(item).prev().autocomplete("close");
                return;
            }
            $(item).prev().autocomplete('search', '');
            $(item).prev().focus();
        });
        $('.admfilter-btn').unbind('click').click(function () {
            var item = $(this);
            $(item).prev().focus();
            if ($(item).prev().autocomplete("widget").is(":visible")) {
                $(item).prev().autocomplete("close");
                return;
            }
            $(item).prev().autocomplete('search', '');
        });
        //        $('.admfilter-btnDate').prev().datepicker({
        //            onClose: function (dateText, inst) {
        //                var item = $(this);
        //                var _value = item.prev().val();
        //                if (_value != '') {
        //                    item.prev().val(dateText);
        //                }
        //            }
        //        })
        $('.admfilter-btnDate').unbind('click').click(function () {
            var item = $(this);
            $(item).prev().datepicker('show');
        });
        $('a.ui-button-text').css('float', 'left');
    },
    loading: function (status, fn) {
        if (status == null) {
            $('#adm-loading').hide();
        } else {
            $('#adm-loading').html(status).show();

            $('<a id=\"adm-loading-close\" class=\"ui-icon ui-icon-close\" href=\"javascript:adm.loading(null);\">x</a>').prependTo('#adm-loading');
        }
        if (typeof (fn) == 'function') {
            fn();
        }
    },
    setupAjax: function () {
        // $.ajaxSetup({
        //     error: function (x, e) {
        //         var l = '';
        //         if (x.status == 0) {
        //             l = 'Bạn đang offline!!\n';
        //         } else if (x.status == 404) {
        //             l = 'Lỗi mã: HTTP404. Tài nguyên không tồn tại';
        //         } else if (x.status == 401) {
        //             l = 'Lỗi mã: HTTP401. Không đủ quyền truy cập';
        //         } else if (x.status == 500) {
        //             l = 'Lỗi mã: HTTP500. Máy chủ đang bận';
        //             //l = 'Module đang trong quá trình phát triển bạn vui lòng quay lại sau.';
        //         } else if (e == 'parsererror') {
        //             l = 'Lỗi mã: JSONDECO. Biên dịch lỗi';
        //         } else if (e == 'timeout') {
        //             l = 'Lỗi mã: TIMEOUT. Hết hạn';
        //         } else {
        //             l = 'Lỗi: ' + x.responseText;
        //         }
        //         if (l.length > 0) {
        //             adm.qframemessenger('caution', l);
        //         }
        //         // adm.loading(l);
        //         setTimeout(function () {
        //             // adm.loading(null);
        //         }, 30000);
        //     },
        //     failure: function (result) {
        //         alert('failure');
        //     }
        // });
    },
    getFormattedDate: function (date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return day + '/' + month + '/' + year;
    },
    DatepickerPublic: function (el) {
        $(el).datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'dd/mm/yy'
        });
    },
    convertdatevn: function (str) {
        var res = str.split("/");
        var sDate = new Date(Date.parse(res[1] + '/' + res[0] + '/' + res[2]));
        return sDate
    },
    convertdatevntext: function (str) {
        var res = str.split("/");
        var sDate = res[1] + '/' + res[0] + '/' + res[2];
        return sDate
    },
    multiselectupload: function (uploadBtn, type, param, callback, callbackFile, _call) {
        if (typeof (qq) == 'undefined') {
            $.getScript('../js/fileuploader.js', function () {
                var defaultParam = { 'act': 'MultiSelectUpload', 'subAct': type };
                param = $.extend(defaultParam, param);

                var uploader = new qq.FileUploader({
                    element: document.getElementById(uploadBtn),
                    action: adm.urlDefault,
                    params: param,
                    inputName: 'FileName',
                    onSubmit: function (id, fileName) { 
                        
                    },
                    onComplete: function (id, fileName, responseJSON) {
                        console.log('-onComplete-------------------------------');
                        console.log(id);
                        console.log(fileName);
                        console.log(responseJSON);
                        var _response = responseJSON;
                        callback(_response);
                        if (typeof (callbackFile) == 'function') {
                            callbackFile(fileName);
                        }
                        if (typeof (_call) == 'function') {
                            _call(_response, fileName);
                        }
                        adm.loading(null);
                        try {
                            $.each(jQuery.browser, function (i, val) {
                                if (i == "mozilla" && jQuery.browser.version.substr(0, 3) == "1.9")
                                    gBrowser.selectedBrowser.markupDocumentViewer.fullZoom = 1;
                            });
                        } catch (err) {
                            //Handle errors here
                        }
                    },
                    // file extension
                    //allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
                    messages: {
                        typeError: "{file} has invalid extension. Only {extensions} are allowed.",
                        emptyError: "{file} is empty, please select files again without it.",
                        allowedExtensionsError: "{file} is not allowed.",
                        onLeave: "The files are being uploaded, if you leave now the upload will be cancelled."
                    },
                    showMessage: function (message) {
                        alert(message);
                    }
                });
            });
        } else {
            var defaultParam = { 'act': 'MultiSelectUpload', 'subAct': type };
            param = $.extend(defaultParam, param);

            var uploader = new qq.FileUploader({
                element: document.getElementById(uploadBtn),
                action: adm.urlDefault,
                params: param,
                inputName: 'FileName',
                onSubmit: function (id, fileName) {

                },
                onComplete: function (id, fileName, responseJSON) {
                    console.log('-onComplete-------------------------------');
                    console.log(id);
                    console.log(fileName);
                    console.log(responseJSON);
                    var _response = responseJSON;
                    callback(_response);
                    if (typeof (callbackFile) == 'function') {
                        callbackFile(fileName);
                    }
                    if (typeof (_call) == 'function') {
                        _call(_response, fileName);
                    }
                    adm.loading(null);
                    try {
                        $.each(jQuery.browser, function (i, val) {
                            if (i == "mozilla" && jQuery.browser.version.substr(0, 3) == "1.9")
                                gBrowser.selectedBrowser.markupDocumentViewer.fullZoom = 1;
                        });
                    } catch (err) {
                        //Handle errors here
                    }
                },
                // file extension
                //allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
                messages: {
                    typeError: "{file} has invalid extension. Only {extensions} are allowed.",
                    emptyError: "{file} is empty, please select files again without it.",
                    allowedExtensionsError: "{file} is not allowed.",
                    onLeave: "The files are being uploaded, if you leave now the upload will be cancelled."
                },
                showMessage: function (message) {
                    alert(message);
                }
            });
        }
        // End Upload
    },
    upload: function (uploadBtn, type, param, callback, callbackFile, _call) {
        if (typeof (Ajax_upload) == 'undefined') {
            $.getScript('../js/ajaxupload.js', function () {
                var defaultParam = { 'act': 'upload', 'subAct': type };
                param = $.extend(defaultParam, param);
                new Ajax_upload($(uploadBtn), {
                    action: adm.urlDefault,
                    name: 'anh',
                    data: param,
                    onSubmit: function (file, ext) {
                        if (type == 'anh' || type == 'adv') {
                            if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))) {
                                // extension is not allowed
                                alert('Lỗi:\n Kiểu File không Hợp lệ');
                                // cancel upload
                                return false;
                            }
                        } else if (type == 'doc') {
                            if (!(ext && /^(doc|docx|xls|xlsx|txt|zip|rar|gz|mp3|avi|ppt|pdf|pptx|pdf|bmp|img|jpg|jpeg|png|gif)$/.test(ext))) {
                                // extension is not allowed
                                alert('Lỗi:\n Kiểu File không Hợp lệ');
                                // cancel upload
                                return false;
                            }
                        }
                        //  adm.loading('Đang nạp');
                    },
                    onComplete: function (file, response) {
                        var _response = response;
                        callback(_response);
                        if (typeof (callbackFile) == 'function') {
                            callbackFile(file);
                        }
                        if (typeof (_call) == 'function') {
                            _call(_response, file);
                        }
                        adm.loading(null);
                        try {
                            $.each(jQuery.browser, function (i, val) {
                                if (i == "mozilla" && jQuery.browser.version.substr(0, 3) == "1.9")
                                    gBrowser.selectedBrowser.markupDocumentViewer.fullZoom = 1;
                            });
                        } catch (err) {
                            //Handle errors here
                        }
                    }
                });
            });
        } else {
            var defaultParam = { 'act': 'upload', 'subAct': type };
            param = $.extend(defaultParam, param);
            new Ajax_upload($(uploadBtn), {
                action: adm.urlDefault,
                name: 'anh',
                data: param,
                onSubmit: function (file, ext) {
                    if (type == 'anh' || type == 'adv') {
                        if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))) {
                            // extension is not allowed
                            alert('Lỗi:\n Kiểu File không Hợp lệ');
                            // cancel upload
                            return false;
                        }
                    } else if (type == 'doc') {
                        if (!(ext && /^(doc|docx|xls|xlsx|txt|zip|rar|gz|mp3|avi|ppt|pdf|pptx|pdf|bmp|img|jpg|jpeg|png|gif)$/.test(ext))) {
                            // extension is not allowed
                            alert('Lỗi:\n Kiểu File không Hợp lệ');
                            // cancel upload
                            return false;
                        }
                    }
                    adm.loading('Đang nạp');
                },
                onComplete: function (file, response) {
                    var _response = response;
                    callback(_response);
                    if (typeof (callbackFile) == 'function') {
                        callbackFile(file);
                    }
                    if (typeof (_call) == 'function') {
                        _call(_response, file);
                    }
                    adm.loading(null);
                    try {
                        $.each(jQuery.browser, function (i, val) {
                            if (i == "mozilla" && jQuery.browser.version.substr(0, 3) == "1.9")
                                gBrowser.selectedBrowser.markupDocumentViewer.fullZoom = 1;
                        });
                    } catch (err) {
                        //Handle errors here
                    }
                }
            });
        }


        // End Upload
    },
    uploadTintuc: function (uploadBtn, type, param, callback, callbackFile, _call) {
        if (typeof (Ajax_upload) == 'undefined') {
            $.getScript('../js/ajaxupload.js', function () {
                var defaultParam = { 'act': 'uploadTintuc', 'subAct': type };
                param = $.extend(defaultParam, param);
                new Ajax_upload($(uploadBtn), {
                    action: adm.urlDefault,
                    name: 'anh',
                    data: param,
                    onSubmit: function (file, ext) {
                        if (type == 'anh' || type == 'adv') {
                            if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))) {
                                // extension is not allowed
                                alert('Lỗi:\n Kiểu File không Hợp lệ');
                                // cancel upload
                                return false;
                            }
                        } else if (type == 'doc') {
                            if (!(ext && /^(doc|docx|xls|xlsx|txt|zip|rar|gz|mp3|avi|ppt|pdf|pptx|pdf|bmp|img|jpg|jpeg|png|gif)$/.test(ext))) {
                                // extension is not allowed
                                alert('Lỗi:\n Kiểu File không Hợp lệ');
                                // cancel upload
                                return false;
                            }
                        }
                        //  adm.loading('Đang nạp');
                    },
                    onComplete: function (file, response) {
                        var _response = response;
                        callback(_response);
                        if (typeof (callbackFile) == 'function') {
                            callbackFile(file);
                        }
                        if (typeof (_call) == 'function') {
                            _call(_response, file);
                        }
                        adm.loading(null);
                        try {
                            $.each(jQuery.browser, function (i, val) {
                                if (i == "mozilla" && jQuery.browser.version.substr(0, 3) == "1.9")
                                    gBrowser.selectedBrowser.markupDocumentViewer.fullZoom = 1;
                            });
                        } catch (err) {
                            //Handle errors here
                        }
                    }
                });
            });
        } else {
            var defaultParam = { 'act': 'uploadTintuc', 'subAct': type };
            param = $.extend(defaultParam, param);
            new Ajax_upload($(uploadBtn), {
                action: adm.urlDefault,
                name: 'anh',
                data: param,
                onSubmit: function (file, ext) {
                    if (type == 'anh' || type == 'adv') {
                        if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))) {
                            // extension is not allowed
                            alert('Lỗi:\n Kiểu File không Hợp lệ');
                            // cancel upload
                            return false;
                        }
                    } else if (type == 'doc') {
                        if (!(ext && /^(doc|docx|xls|xlsx|txt|zip|rar|gz|mp3|avi|ppt|pdf|pptx|pdf|bmp|img|jpg|jpeg|png|gif)$/.test(ext))) {
                            // extension is not allowed
                            alert('Lỗi:\n Kiểu File không Hợp lệ');
                            // cancel upload
                            return false;
                        }
                    }
                    adm.loading('Đang nạp');
                },
                onComplete: function (file, response) {
                    var _response = response;
                    callback(_response);
                    if (typeof (callbackFile) == 'function') {
                        callbackFile(file);
                    }
                    if (typeof (_call) == 'function') {
                        _call(_response, file);
                    }
                    adm.loading(null);
                    try {
                        $.each(jQuery.browser, function (i, val) {
                            if (i == "mozilla" && jQuery.browser.version.substr(0, 3) == "1.9")
                                gBrowser.selectedBrowser.markupDocumentViewer.fullZoom = 1;
                        });
                    } catch (err) {
                        //Handle errors here
                    }
                }
            });
        }


        // End Upload
    },
    uploadTintuc1: function (uploadBtn, type, param, callback, callbackFile, _call) {

        if (typeof (Ajax_upload) == 'undefined') {
            jQuery.getScript('../lib/js/ajaxupload.js', function () {
                var defaultParam = { 'act': 'uploadTintuc', 'subAct': type };
                param = jQuery.extend(defaultParam, param);
                //return false;
                new Ajax_upload(jQuery(uploadBtn), {
                    action: adm.urlDefault0,
                    name: 'anh',
                    data: param,
                    onSubmit: function (file, ext) {
                        if (type == 'anh' || type == 'adv') {
                            if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))) {
                                // extension is not allowed
                                alert('Lỗi:\n Kiểu File không Hợp lệ');
                                // cancel upload
                                return false;
                            }
                        }
                        else if (type == 'flash') {
                            if (!(ext && /^(jpg|png|jpeg|gif|swf)$/.test(ext))) {
                                // extension is not allowed
                                alert('Lỗi:\n Kiểu File không Hợp lệ');
                                // cancel upload
                                return false;
                            }
                        }
                        else if (type == 'doc') {
                            if (!(ext && /^(doc|docx|xls|xlsx|txt|zip|rar|gz|mp3|avi|ppt|pptx)$/.test(ext))) {
                                // extension is not allowed
                                alert('Lỗi:\n Kiểu File không Hợp lệ');
                                // cancel upload
                                return false;
                            }
                        }
                        adm.loading('Đang nạp');
                    },
                    onComplete: function (file, response) {
                        var _response = response;
                        callback(_response);
                        if (typeof (callbackFile) == 'function') {
                            callbackFile(file);
                        }
                        if (typeof (_call) == 'function') {
                            _call(_response, file);
                        }
                        adm.loading(null);
                        try {
                            jQuery.each(jQuery.browser, function (i, val) {
                                if (i == "mozilla" && jQuery.browser.version.substr(0, 3) == "1.9")
                                    gBrowser.selectedBrowser.markupDocumentViewer.fullZoom = 1;
                            });
                        }
                        catch (err) {
                            //Handle errors here
                        }
                    }
                });
            });
        }
        else {
            var defaultParam = { 'act': 'uploadTintuc', 'subAct': type };
            param = jQuery.extend(defaultParam, param);
            new Ajax_upload(jQuery(uploadBtn), {
                action: adm.urlDefault0,
                name: 'anh',
                data: param,
                onSubmit: function (file, ext) {
                    if (type == 'anh' || type == 'adv') {
                        if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))) {
                            // extension is not allowed
                            alert('Lỗi:\n Kiểu File không Hợp lệ');
                            // cancel upload
                            return false;
                        }
                    }
                    else if (type == 'flash') {
                        if (!(ext && /^(jpg|png|jpeg|gif|swf)$/.test(ext))) {
                            // extension is not allowed
                            alert('Lỗi:\n Kiểu File không Hợp lệ');
                            // cancel upload
                            return false;
                        }
                    }
                    else if (type == 'doc') {
                        if (!(ext && /^(doc|docx|xls|xlsx|txt|zip|rar|gz|mp3|avi|ppt|pptx)$/.test(ext))) {
                            // extension is not allowed
                            alert('Lỗi:\n Kiểu File không Hợp lệ');
                            // cancel upload
                            return false;
                        }
                    }
                    adm.loading('Đang nạp');
                },
                onComplete: function (file, response) {
                    var _response = response;
                    callback(_response);
                    if (typeof (callbackFile) == 'function') {
                        callbackFile(file);
                    }
                    if (typeof (_call) == 'function') {
                        _call(_response, file);
                    }
                    adm.loading(null);
                    try {
                        jQuery.each(jQuery.browser, function (i, val) {
                            if (i == "mozilla" && jQuery.browser.version.substr(0, 3) == "1.9")
                                gBrowser.selectedBrowser.markupDocumentViewer.fullZoom = 1;
                        });
                    }
                    catch (err) {
                        //Handle errors here
                    }
                }
            });
        }


        // End Upload
    },
    uploadHS: function (uploadBtn, type, param, callback, callbackFile, _call) {
        if (typeof (Ajax_upload) == 'undefined') {
            $.getScript('../js/ajaxupload.js', function () {
                var defaultParam = { 'act': 'uploadHS', 'subAct': type };
                param = $.extend(defaultParam, param);
                new Ajax_upload($(uploadBtn), {
                    action: adm.urlDefault,
                    name: 'anh',
                    data: param,
                    onSubmit: function (file, ext) {
                        if (type == 'anh' || type == 'adv') {
                            if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))) {
                                // extension is not allowed
                                alert('Lỗi:\n Kiểu File không Hợp lệ');
                                // cancel upload
                                return false;
                            }
                        } else if (type == 'doc') {
                            if (!(ext && /^(doc|docx|xls|xlsx|txt|zip|rar|gz|mp3|avi|ppt|pdf|pptx|pdf|bmp|img|jpg|jpeg|png|gif)$/.test(ext))) {
                                // extension is not allowed
                                alert('Lỗi:\n Kiểu File không Hợp lệ');
                                // cancel upload
                                return false;
                            }
                        }
                        // adm.loading('Đang nạp');
                    },
                    onComplete: function (file, response) {
                        var _response = response;
                        callback(_response);
                        if (typeof (callbackFile) == 'function') {
                            callbackFile(file);
                        }
                        if (typeof (_call) == 'function') {
                            _call(_response, file);
                        }
                        adm.loading(null);
                        try {
                            $.each(jQuery.browser, function (i, val) {
                                if (i == "mozilla" && jQuery.browser.version.substr(0, 3) == "1.9")
                                    gBrowser.selectedBrowser.markupDocumentViewer.fullZoom = 1;
                            });
                        } catch (err) {
                            //Handle errors here
                        }
                    }
                });
            });
        } else {
            var defaultParam = { 'act': 'uploadHS', 'subAct': type };
            param = $.extend(defaultParam, param);
            new Ajax_upload($(uploadBtn), {
                action: adm.urlDefault,
                name: 'anh',
                data: param,
                onSubmit: function (file, ext) {
                    if (type == 'anh' || type == 'adv') {
                        if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))) {
                            // extension is not allowed
                            alert('Lỗi:\n Kiểu File không Hợp lệ');
                            // cancel upload
                            return false;
                        }
                    } else if (type == 'doc') {
                        if (!(ext && /^(doc|docx|xls|xlsx|txt|zip|rar|gz|mp3|avi|ppt|pdf|pptx|pdf|bmp|img|jpg|jpeg|png|gif)$/.test(ext))) {
                            // extension is not allowed
                            alert('Lỗi:\n Kiểu File không Hợp lệ');
                            // cancel upload
                            return false;
                        }
                    }
                    adm.loading('Đang nạp');
                },
                onComplete: function (file, response) {
                    var _response = response;
                    callback(_response);
                    if (typeof (callbackFile) == 'function') {
                        callbackFile(file);
                    }
                    if (typeof (_call) == 'function') {
                        _call(_response, file);
                    }
                    adm.loading(null);
                    try {
                        $.each(jQuery.browser, function (i, val) {
                            if (i == "mozilla" && jQuery.browser.version.substr(0, 3) == "1.9")
                                gBrowser.selectedBrowser.markupDocumentViewer.fullZoom = 1;
                        });
                    } catch (err) {
                        //Handle errors here
                    }
                }
            });
        }


        // End Upload
    },
    createTinyMce: function (el, _h, _w) {
        var config = {
            toolbar:
                [
                    ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', 'Image'],
                    ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                    ['Styles', 'Format', 'Font', 'FontSize'],
                    ['TextColor', 'BGColor', 'Table'],
                    ['UIColor', 'Source', 'Maximize']
                ]
        };
        var editor = $(el).ckeditor(config, function () {
            CKFinder.setupCKEditor(this, '../js/ckfinder/');
            if (_h != 'undefined') {
                $('.cke_contents').css({ 'height': _h });
            }
            if (_w != 'undefined') {
                $('.cke_contents').css({ 'width': _w });
            }
        });
    },
    createTinyMces: function (el) {
        $(el).tinymce({
            // Location of TinyMCE script
            script_url: '../js/tinymce/jscripts/tiny_mce/tiny_mce.js',

            // General options
            theme: "advanced",
            plugins: "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

            // Theme options
            theme_advanced_buttons1: "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
            theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
            theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
            //            theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom",
            theme_advanced_resizing: true,

            // Example content CSS (should be your site CSS)
            content_css: "css/content.css",

            // Drop lists for link/image/media/template dialogs
            template_external_list_url: "lists/template_list.js",
            external_link_list_url: "lists/link_list.js",
            external_image_list_url: "lists/image_list.js",
            media_external_list_url: "lists/media_list.js",

            // Replace values for the template plugin
            template_replace_values: {
                username: "Some User",
                staffid: "991234"
            }
        });
    },
    ajaxtimer: null,
    ajaxbusy: false,
    ajaxreq: function (param, url, dtType, callback, overrideSuccessFunc) {
        var loadajax = function () {
            if (adm.ajaxbusy) {
                if (adm.ajaxtimer) {
                    clearInterval(adm.ajaxtimer);
                }
                adm.ajaxtimer = setInterval(loadajax, 1000);
                return false;
            }
            if (adm.ajaxtimer) clearInterval(adm.ajaxtimer);
            $.ajax({
                type: 'POST',
                url: url,
                data: param,
                dataType: dtType,
                timeout: 100000,
                beforeSend: function () {
                    adm.ajaxbusy = true;
                    adm.loading('Đang nạp', null);
                },
                success: function (dt) {
                    adm.ajaxbusy = false;
                    adm.loading(null);
                    overrideSuccessFunc(dt);
                }
            });
        };
        loadajax();
    },
    highlightDate: function (el, fn) {
        $(el).animate({ backgroundColor: 'orange' }, 500, function () {
            $(el).animate({ backgroundColor: 'orange' }, 500, function () {
                if (typeof (fn) == 'function') {
                    fn();
                }
            });
        });
    },
    highlight: function (el, fn) {
        $(el).animate({ backgroundColor: 'orange' }, 500, function () {
            $(el).animate({ backgroundColor: 'white' }, 500, function () {
                if (typeof (fn) == 'function') {
                    fn();
                }
            });
        });
    },
    watermark: function (el, txt, fn) {
        if ($(el).length < 1) return false;
        $(el).val(txt);
        $(el).focus(function () {
            var _parent = $(el).parent();
            var _clear = $(el).prev();
            var _v = $(el).val();
            if (_v == txt) {
                $(el).val('');
            }
            if (_v != txt || _v != '') {
                $(_clear).show();
            }
            $(_parent).removeClass('mdl-head-txt-focus');
            $(_parent).addClass('mdl-head-txt-focus');
        });
        $(el).prev().unbind('click').click(function () {
            $(el).val(txt);
            $(el).attr('_value', '');
            $(el).attr('_ma', '');
            $(el).parent().removeClass('mdl-head-txt-focus');
            $(el).prev().hide();
            fn();
        });
        $(el).blur(function () {
            var _parent = $(el).parent();
            var _clear = $(el).prev();
            var _v = $(el).val();
            if (_v == '') {
                $(el).val(txt);
                $(_clear).hide();
                $(_parent).removeClass('mdl-head-txt-focus');
            }
        });
    },
    watermarks: function (el, txt, fn) {
        if ($(el).length < 1) return false;
        $(el).val(txt);
        $(el).addClass('watermark-focus-no');
        $(el).focus(function () {
            var _v = $(el).val();
            if (_v == txt) {
                $(el).val('');
                $(el).removeClass('watermark-focus-no');
            }
        });
        $(el).blur(function () {
            var _v = $(el).val();
            if (_v == '') {
                $(el).val(txt);
                $(el).addClass('watermark-focus-no');
                if (typeof (fn) == 'function') {
                    fn();
                }
            }
        });
    },
    isInt: function (s) {
        var isInteger = function (s) {
            var i;
            if (isEmpty(s))
                if (isInteger.arguments.length == 1) return false;
                else return (isInteger.arguments[1] == true);

            for (i = 0; i < s.length; i++) {
                var c = s.charAt(i);

                if (!isDigit(c)) return false;
            }

            function isEmpty(s) {
                return ((s == null) || (s.length == 0));
            }

            function isDigit(c) {
                return ((c >= "0") && (c <= "9"));
            }

            return true;
        }
        return isInteger(s);
    },
    isDate: function (el, text) {
        var marker = "/";
        var submitDate = text;
        var dateComp = submitDate.split(marker);
        var now = new Date();
        var yearNow = now.getFullYear();
        var dayInmonth = new Array(12);
        dayInmonth[0] = 31;
        dayInmonth[1] = 29;
        dayInmonth[2] = 31;
        dayInmonth[3] = 30;
        dayInmonth[4] = 31;
        dayInmonth[5] = 30;
        dayInmonth[6] = 31;
        dayInmonth[7] = 31;
        dayInmonth[8] = 31;
        dayInmonth[9] = 31;
        dayInmonth[10] = 30;
        dayInmonth[11] = 31;
        if (dateComp.length != 3) {
            //alert("Please enter correct date format for " + text + " (mm/dd/yyyy)!");
            adm.highlight(el);
            return false;
        }
        for (var i = 0; i < 3; i++) {
            if (isNaN(dateComp[i])) {
                //alert("Please enter numeric for month, date, and year ( " + text + " )!");
                adm.highlight(el);
                return false;
            }
        }
        if (dateComp[1] > 12 || dateComp[1] < 1) {
            //alert("Please enter a valid month for " + text + " (1 to 12)!");
            adm.highlight(el);
            return false;
        }
        if (dateComp[2] > yearNow + 100) {
            //alert("Please enter a valid year for " + text + "! (future)");
            adm.highlight(el);
            return false;
        }
        if (dateComp[2] < yearNow - 100) {
            //alert("Please enter a valid year for " + text + "! (past)");
            adm.highlight(el);
            return false;
        }
        if (dateComp[2] % 4 == 0) {
            dayInmonth[1] = 29;
        } else {
            dayInmonth[1] = 28;
        }
        if (dateComp[0] > dayInmonth[dateComp[1] - 1] || dateComp[0] < 1) {
            //alert("Please enter a valid date!");
            adm.highlight(el);
            return false;
        }
        return true;
    },
    isDateNS: function (el, text) {
        var marker = "/";
        var submitDate = text;
        var kt = 1;
        var dateComp = submitDate.split(marker);
        var now = new Date();
        var yearNow = now.getFullYear();
        var dayInmonth = new Array(12);
        dayInmonth[0] = 31;
        dayInmonth[1] = 29;
        dayInmonth[2] = 31;
        dayInmonth[3] = 30;
        dayInmonth[4] = 31;
        dayInmonth[5] = 30;
        dayInmonth[6] = 31;
        dayInmonth[7] = 31;
        dayInmonth[8] = 31;
        dayInmonth[9] = 31;
        dayInmonth[10] = 30;
        dayInmonth[11] = 31;
        //  adm.highlight(el);

        if (dateComp.length != 3) {
            //alert("Please enter correct date format for " + text + " (mm/dd/yyyy)!");

            return 0;
        }
        for (var i = 0; i < 3; i++) {
            if (isNaN(dateComp[i])) {
                //alert("Please enter numeric for month, date, and year ( " + text + " )!");
                //    adm.highlight(el);
                kt = 0;
            }
        }
        if (dateComp[1] > 12 || dateComp[1] < 1) {
            //alert("Please enter a valid month for " + text + " (1 to 12)!");
            //   adm.highlight(el);
            kt = 0;
        }
        if (dateComp[2] > yearNow + 100) {
            //alert("Please enter a valid year for " + text + "! (future)");
            adm.highlight(el);
            kt = 0;
        }
        if (dateComp[2] < yearNow - 100) {
            //alert("Please enter a valid year for " + text + "! (past)");
            //  adm.highlight(el);
            kt = 0;
        }
        if (dateComp[2] % 4 == 0) {
            dayInmonth[1] = 29;
        } else {
            dayInmonth[1] = 28;
        }
        if (dateComp[0] > dayInmonth[dateComp[1] - 1] || dateComp[0] < 1) {
            //alert("Please enter a valid date!");
            //  adm.highlight(el);

            kt = 0;
        }
        //   alert(dateComp[0] + ',' + dateComp[1]);

        return kt;
    },
    percent: function (p, fullwith) {
        return (p * fullwith) / 100;
    },
    validElValAjax: function (el, fn) {
        var _t;
        jQuery(el).keyup(function () {
            var _v = jQuery(el).val();
            var _old = jQuery(el).attr('_old');
            if (_t) {
                clearInterval(_t);
            }
            _t = setInterval(function () {
                if (_t) {
                    clearInterval(_t);
                }
                if (_v == '') return false;
                if (_old == _v) return false;
                if (typeof (fn) == 'function') {
                    jQuery(el).attr('_old', _v);
                    fn(_v, _t);
                }
            }, 800);
        });
    },
    regStartFn: function (plug, param, fn) {
        var defaultParam = { 'subAct': 'Startfn' };
        param = $.extend(defaultParam, param);
        adm.loadPlug(plug, param, function (data) {
            if (typeof (fn) == 'function') {
                fn(data);
            }
        });
    },
    regType: function (_t, plug, fn) {
        if (_t == 'undefined') {
            //  adm.loading('Nạp ' + plug);
            adm.loadPlug(plug, { 'subAct': 'scpt' }, function (data) {
                //  adm.loading('Get script' + _t);
                $.getScript(data, function () {
                    adm.loading(null);
                    if (typeof (fn) == 'function') {
                        fn();
                    }
                });
            });
        } else {
            if (typeof (fn) == 'function') {
                fn();
            }
        }
    },
    regTypeFix: function (_t, plug, fn) {
        if (_t == 'undefined') {
            //  adm.loading('Nạp ' + plug);
            adm.loadPlug(plug, { 'subAct': 'scpt' }, function (data) {
                //  adm.loading('Get script' + _t);
                $.getScript(data, function () {
                    adm.loading(null);
                    if (typeof (fn) == 'function') {
                        fn();
                    }
                });
            });
        } else {
            if (typeof (fn) == 'function') {
                fn();
            }
        }
    },
    regQS: function (el, _tableId) {
        if (jQuery().quicksearch) {
            $(el).quicksearch('table#' + _tableId + ' tbody tr');
        } else {
            $.getScript('../js/jquery.quicksearch.js', function () {
                $(el).quicksearch('table#' + _tableId + ' tbody tr');
            });
        }
    },
    regjQueryPlugin: function (plugin, src, fn) {
        if (plugin) {
            if (typeof (fn) == 'function') {
                fn();
            }
        } else {
            $.getScript(src, function () {
                if (typeof (fn) == 'function') {
                    fn();
                }
            });
        }
    },
    tbao: function (s, fn) {
        var x = 'auto';
        if (typeof (fn) == 'function') {
            x = fn();

        }
        var newDlg = $('#global-dialog-alert');
        if ($(newDlg).length < 1) {
            $('body').append('<div id=\"global-dialog-alert\"></div>');
            newDlg = $('#global-dialog-alert');
        }
        // $(newDlg).dialog({
        //     modal: true,
        //     width: 250,
        //     title: 'THÔNG BÁO',
        //     buttons: {
        //         'Đóng': function () {
        //             $(newDlg).dialog('close');
        //             if (typeof (fn) == 'function') {
        //                 fn();
        //             }
        //         }
        //     },
        //     open: function () {
        //         if (typeof (fn) == 'function') {
        //             fn();
        //         }
        //         $(newDlg).html('<div style="font-weight:bold;text-align:center;">' + s + '</div>');
        //     }
        // });
    },
    KhuyenCao: function (s, fn) {
        var newDlg = $('#KhuyenCao-Dlg');
        if ($(newDlg).length < 1) {
            $('body').append('<div id=\"KhuyenCao-Dlg\"></div>');
            newDlg = $('#KhuyenCao-Dlg');
        }
        // $(newDlg).dialog({
        //     modal: true,
        //     width: 400,
        //     title: 'THÔNG BÁO',
        //     buttons: {
        //         'Đóng': function () {
        //             $(newDlg).dialog('close');
        //             window.close();
        //             if (typeof (fn) == 'function') {
        //                 fn();
        //             }
        //         }
        //     },
        //     open: function () {
        //         if (typeof (fn) == 'function') {
        //             fn();
        //         }
        //         $(newDlg).html(s);
        //     }
        // });
        // $(newDlg).dialog("option", "position", "center");
    },
    live: function (s) { //Channel realtim
        return false;
        var loadajax = function () {
            if (_gloAjaxBusy) {
                if (_gloTimer) {
                    clearInterval(_gloTimer);
                }
                _gloTimer = setInterval(loadajax, 5000);
                return false;
            }
            _gloAjaxBusy = true;
            if (_gloTimer) clearInterval(_gloTimer);
            if (s == null) s = '';
            $.ajax({
                url: adm.urlDefault + '&act=loadPlug&rqPlug=docsoft.hethong.channel.Class1, docsoft.hethong.channel',
                dataType: 'script',
                data: {
                    'subAct': 'get',
                    's': s
                },
                success: function (dt) {
                    _gloAjaxBusy = false;
                },
                error: function (x, e) {
                    _gloAjaxBusy = false;
                    _gloTimer = setInterval(function () {
                        loadajax();
                    }, 5000);
                }
            });
        };
        setInterval(function () {
            loadajax();
        }, 5000);
    },
    loadIfr: function (url, fn, fn1) {
        if (typeof (fn) == 'function') {
            fn();
        }
        var ifr = $('#ifr');
        if ($(ifr).length < 1) {
            var l = '<iframe id=\"ifr\" style=\"display:none;\" />';
            $('body').append(l);
        }
        ifr = $('#ifr');
        $(ifr).attr('src', url);
        //alert(url);
        $(ifr).onload = function () {
            if (typeof (fn1) == 'function') {
                fn1();
            }
        };
    },
    inorgeCaseMap: {
        'á': 'a',
        'ạ': 'a',
        'ả': 'a',
        'ă': 'a',
        'ắ': 'a',
        'ặ': 'a',
        'ö': 'o',
        'ụ': 'u',
        'ộ': 'o',
        'ỷ': 'y',
        'ủ': 'u',
        'ư': 'u',
        'ê': 'e',
        'ế': 'e',
        'ệ': 'e',
        'ề': 'e',
        'ể': 'e',
        'é': 'e',
        'è': 'e',
        'ẹ': 'e',
        'í': 'i',
        'ị': 'i',
        'ả': 'a',
        'á': 'a',
        'ạ': 'a',
        'ợ': 'o',
        'ờ': 'o',
        'ớ': 'o',
        'ợ': 'o',
        ' ờ': 'o',
        'ổ': 'o',
        'ồ': 'o',
        'ố': 'o',
        'ộ': 'o',
        'ị': 'i',
        'ì': 'i',
        'í': 'i',
        'ỉ': 'i',
        'ô': 'o',
        'ò': 'o',
        'ó': 'o',
        'ỏ': 'o',
        'â': 'a',
        'ầ': 'a',
        'ấ': 'a',
        'ũ': 'u',
        'ụ': 'u',
        ' ủ': 'u',
        'à': 'a',
        ' á': 'a',
        'đ': 'd',
        'ở': 'o'
    },
    normalizeStr: function (term) {
        var ret = "";
        for (var i = 0; i < term.length; i++) {
            ret += adm.inorgeCaseMap[term.charAt(i)] || term.charAt(i);
        }
        return ret;
    },
    viewClip: function () {
        var l = '<object width=\"760\" height=\"595\"><param name=\"movie\" value=\"http://www.youtube.com/v/_Dqbvdjkrqs?fs=1&amp;hl=vi_VN&amp;hd=1&amp;color1=0x006699&amp;color2=0x54abd6&amp;autoplay=1\"></param><param name=\"allowFullScreen\" value=\"true\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed src=\"http://www.youtube.com/v/_Dqbvdjkrqs?fs=1&amp;hl=vi_VN&amp;hd=1&amp;color1=0x006699&amp;color2=0x54abd6&amp;autoplay=1\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"760\" height=\"595\"></embed></object>';
        var newDlg = $('#global-dialog-alert');
        if ($(newDlg).length < 1) {
            $('body').append('<div id=\"global-dialog-alert\"></div>');
            newDlg = $('#global-dialog-alert');
        }
        $(newDlg).dialog({
            modal: true,
            title: 'Video hướng dẫn',
            width: 800,
            height: 600,
            buttons: {
                'Đóng': function () {
                    $(newDlg).dialog('close');
                }
            },
            open: function () {
                $(newDlg).html(l);
            }
        });
    },

    createFck_TN: function (el) {
        var config = {
            toolbar:
                [
                    ['Bold', 'Italic'],
                    ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                    ['Styles', 'Format', 'Font', 'FontSize']
                ],
            width: $(el).parent().width(),
            height: 300,
            removePlugins: 'elementspath',
            resize_enabled: false
        };
        var editor = jQuery(el).ckeditor(config, function () {
            CKFinder.setupCKEditor(this, 'ckfinder/');
        });
    },

    // Created by: Justin Barlow | http://www.netlobo.com/
    // This script downloaded from www.JavaScriptBank.com

    // This function formats numbers by adding commas
    numberFormatfn: function (nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    },

    // This function removes non-numeric characters
    stripNonNumericfn: function (str) {
        str += '';
        var rgx = /^\d|\.|-$/;
        var out = '';
        for (var i = 0; i < str.length; i++) {
            if (rgx.test(str.charAt(i))) {
                if (!((str.charAt(i) == ',' && out.indexOf('.') != -1) ||
                    (str.charAt(i) == '-' && out.length != 0))) {
                    out += str.charAt(i);
                }
            }
        }
        return out;
    },
    roundNumericfn: function (str) {
        str += '';
        var out = '';
        //alert(str);
        var arr = str.split('.');
        for (var i = 0; i < arr.length; i++) {
            out += arr[0];
            if (arr.length > 1) {
                if (arr[1].length > 2) {
                    out += '.' + arr[1].substring(0, 2);
                } else {
                    out += '.' + arr[1].substring(0, 2);
                }
            }
            break;
        }

        return out;
    },
    shortvndate: function (_dDate, _fullYear) {
        /*
        _dDate : ngày cần chuyển (Ngày kiểu anh, mỹ)
        _fullyear
        true    : full year
        false   : year 2 chữ số
        */
        if (_dDate != "") {
            var _sdate = new Date(_dDate);
            if (_sdate.getFullYear() == 100) {
                return "";
            } else {
                var year = '' + _sdate.getFullYear().toString() + '';
                var years = year;
                if (!_fullYear) {
                    years = year.substr(2);
                }

                var fdate = _sdate.getDate();
                if (fdate < 10) {
                    fdate = '0' + fdate.toString();
                }

                var fmonth = parseInt(_sdate.getMonth()) + 1;

                if (fmonth < 10) {
                    fmonth = '0' + fmonth.toString();
                }
                if ((fdate.toString() + '/' + fmonth.toString() + '/' + years.toString()) == 'NaN/NaN/NaN') {
                    return "";
                }
                else
                    return fdate.toString() + '/' + fmonth.toString() + '/' + years.toString();
            }
        }
        else {
            return "";
        }
    },
    replaceAll: function (str, from, to) {

        var idx = str.indexOf(from);

        while (idx > -1) {
            str = str.replace(from, to);
            idx = str.indexOf(from);
        }

        return str;
    },

    keyupsearch: function (el, txt, fn) {
        adm.watermarks(el, txt, function () {
            _value = '';
            if (typeof (fn) == 'function') {
                fn(_value);
            }
        });
        var _t;
        $(el).unbind('keyup').keyup(function () {
            var _v = $(el).val(); //gia tri moi
            var _old = $(el).attr('_old'); //gia tri cu
            if (_t) {
                clearInterval(_t);
            }
            _t = setInterval(function () {
                if (_t) {
                    clearInterval(_t);
                }
                //if (_v == '') return false;
                if (_old == _v) return false;
                $(el).attr('_old', _v);
                if (typeof (fn) == 'function') {
                    fn(_v);
                }
            }, 800);
        });
    },
    quickFindGridFn: function (el, v, c, fn) {
        /*
        el  : grid;
        v   : url;
        c   : title
        fn  : callback function
        */
        $(el).jqGrid('setCaption', c);
        $(el).jqGrid('setGridParam', { url: v.urlDefault }).trigger('reloadGrid');
        if (typeof (fn) == "function") {
            fn();
        }
    },
    clearCombo: function (el, t, fn) {
        // fn : on / off combo c

        $.each(el, function (i, item) {
            if (item != t) {
                item.attr('_value', "");
                item.attr('_value1', "");
                item.attr('_ma', "");
                item.attr('_ma1', "");
                item.attr('_old', "");
                item.val(item.attr('_hint'));
                item.attr('_username', "");
                item.attr('_username1', "");
            }
        });

        if (typeof (fn) == "function") {
            fn();
        }
    },
    strip_tags: function (str, allowed_tags) {
        var key = '', allowed = false;
        var matches = [];
        var allowed_array = [];
        var allowed_tag = '';
        var i = 0;
        var k = '';
        var html = '';
        var replacer = function (search, replace, str) {
            return str.split(search).join(replace);
        };

        // Build allowes tags associative array
        if (allowed_tags) {
            allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);
        }

        str += '';

        // Match tags
        matches = str.match(/(<\/?[\S][^>]*>)/gi);

        // Go through all HTML tags
        for (key in matches) {
            if (isNaN(key)) {
                // IE7 Hack
                continue;
            }

            // Save HTML tag
            html = matches[key].toString();

            // Is tag not in allowed list? Remove from str!
            allowed = false;

            // Go through all allowed tags
            for (k in allowed_array) {
                // Init
                allowed_tag = allowed_array[k];
                i = -1;

                if (i != 0) {
                    i = html.toLowerCase().indexOf('<' + allowed_tag + '>');
                }
                if (i != 0) {
                    i = html.toLowerCase().indexOf('<' + allowed_tag + ' ');
                }
                if (i != 0) {
                    i = html.toLowerCase().indexOf('</' + allowed_tag);
                }

                // Determine
                if (i == 0) {
                    allowed = true;
                    break;
                }
            }
            if (!allowed) {
                str = replacer(html, "", str); // Custom replace. No regexing
            }
        }
        return str;
    },
    dateAdd: function (p_Interval, p_Number, p_Date) {
        /* kiểu công:
        d = ngày
        w = tuần
        m = tháng
        q = quý
        yyyy = năm
        */
        if (isNaN(p_Number)) {
            return "invalid number: '" + p_Number + "'";
        }

        p_Number = new Number(p_Number);
        var dt = new Date(p_Date);
        switch (p_Interval.toLowerCase()) {
            case "yyyy":
                { // year
                    dt.setFullYear(dt.getFullYear() + p_Number);
                    break;
                }
            case "q":
                { // quarter
                    dt.setMonth(dt.getMonth() + (p_Number * 3));
                    break;
                }
            case "m":
                { // month
                    dt.setMonth(dt.getMonth() + p_Number);
                    break;
                }
            case "y":
                // day of year
            case "d":
                // day
            case "w":
                { // weekday
                    dt.setDate(dt.getDate() + p_Number);
                    break;
                }
            case "ww":
                { // week of year
                    dt.setDate(dt.getDate() + (p_Number * 7));
                    break;
                }
            case "h":
                { // hour
                    dt.setHours(dt.getHours() + p_Number);
                    break;
                }
            case "n":
                { // minute
                    dt.setMinutes(dt.getMinutes() + p_Number);
                    break;
                }
            case "s":
                { // second
                    dt.setSeconds(dt.getSeconds() + p_Number);
                    break;
                }
            case "ms":
                { // second
                    dt.setMilliseconds(dt.getMilliseconds() + p_Number);
                    break;
                }
            default:
                {
                    return "invalid interval: '" + p_Interval + "'";
                }
        }
        return dt;
    },
    Guid: {
        Set: function (val) {
            var value;
            if (arguments.length == 1) {
                if (this.IsValid(arguments[0])) {
                    value = arguments[0];
                } else {
                    value = this.Empty();
                }
            }
            $(this).data("value", value);
            return value;
        },

        Empty: function () {
            return "00000000-0000-0000-0000-000000000000";
        },

        IsEmpty: function (gid) {
            return gid == this.Empty() || typeof (gid) == 'undefined' || gid == null || gid == '';
        },

        IsValid: function (value) {
            rGx = new RegExp("\\b(?:[A-F0-9]{8})(?:-[A-F0-9]{4}){3}-(?:[A-F0-9]{12})\\b");
            return rGx.exec(value) != null;
        },

        New: function () {
            if (arguments.length == 1 && this.IsValid(arguments[0])) {
                $(this).data("value", arguments[0]);
                value = arguments[0];
            }

            var res = [], hv;
            var rgx = new RegExp("[2345]");
            for (var i = 0; i < 8; i++) {
                hv = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                if (rgx.exec(i.toString()) != null) {
                    if (i == 3) {
                        hv = "6" + hv.substr(1, 3);
                    }
                    res.push("-");
                }
                res.push(hv.toUpperCase());
            }
            value = res.join('');
            $(this).data("value", value);
            return value;
        },

        Value: function () {
            if ($(this).data("value")) {
                return $(this).data("value");
            }
            var val = this.New();
            $(this).data("value", val);
            return val;
        }
    },
    removeUndefined: function (str) {
        if ((typeof (str) == 'undefined')) {
            return "";
        }
        return str;
    },
    dateDiff: function (dDate1, dDate2, dType) {
        var DateDiff = {
            inDays: function (d1, d2) {
                var t2 = d2.getTime();
                var t1 = d1.getTime();

                return parseInt((t2 - t1) / (24 * 3600 * 1000));
            },

            inWeeks: function (d1, d2) {
                var t2 = d2.getTime();
                var t1 = d1.getTime();

                return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
            },

            inMonths: function (d1, d2) {
                var d1Y = d1.getFullYear();
                var d2Y = d2.getFullYear();
                var d1M = d1.getMonth();
                var d2M = d2.getMonth();

                return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
            },

            inYears: function (d1, d2) {
                return d2.getFullYear() - d1.getFullYear();
            }
        };
        dDate1 = new Date(dDate1);
        dDate2 = new Date(dDate2);
        switch (dType) {
            case "d":
                return DateDiff.inDays(dDate1, dDate2);
            case "w":
                return DateDiff.inWeeks(dDate1, dDate2);
            case "m":
                return DateDiff.inMonths(dDate1, dDate2);
            case "y":
                return DateDiff.inYears(dDate1, dDate2);
        }
    },
    checkdateAll: function (multiID) {
        var arr;
        kt = 0;
        if (multiID != '') {
            arr = multiID.split(',');
            for (var i = 0; i < arr.length; i++) {
                //   alert(adm.isDateNS($('.' + arr[i] + '').val()));
                if (adm.isDateNS($('.' + arr[i] + ''), $('.' + arr[i] + '').val()) == 0) {
                    kt = 1;
                }
            }

        }

        return kt;
    },
    ViewAuthen: function (NewDlg) {
        // var NewDlg = $('#main-capnhathoso-Newdlg');
        $('input', NewDlg).attr('readonly', 'readonly');
        $('input', NewDlg).attr('disabled', 'disabled');
        $('input', NewDlg).css('background-color', 'white');
        $('input', NewDlg).css('border', 'none');
        $('input', NewDlg).css('font-weight', 'bold');
        $('input', NewDlg).css('color', 'Blue');
        $('.XoaAnh', NewDlg).remove();
        $('.XoaClass', NewDlg).remove();
        $('textarea', NewDlg).attr('readonly', 'readonly');
        $('textarea', NewDlg).attr('disabled', 'disabled');
        $('textarea', NewDlg).css('background-color', 'white');
        $('textarea', NewDlg).css('border', 'none');
        $('textarea', NewDlg).css('font-weight', 'bold');
        $('textarea', NewDlg).css('color', 'Blue');
        $('.MaHS_Chu', NewDlg).css('font-weight', 'bold');
        $('.MaHS_Chu', NewDlg).css('color', 'Blue');
        $('.remove-empty', NewDlg).remove();
        $('.admtxt-280', NewDlg).css('border', 'none');
        $('button', NewDlg).remove();
        $('a[role=button]', NewDlg).parent().remove();
        $('.Anh', NewDlg).remove();

        $('.ThemTrinhDo', NewDlg).remove();
        $('.ThemTrinhDoNgoaiNgu', NewDlg).remove();
        //        $('#quanhegiadinh-Newdlg', NewDlg).remove();
        //        $('#quatrinhcongtacnn-Newdlg', NewDlg).remove();
        //        $('#quatrinhdanhgiaxeploai-Newdlg', NewDlg).remove();
        //        $('#giaytolienquan-Newdlg', NewDlg).remove();
        //        $('#nhiemkycongtac-Newdlg', NewDlg).remove();
    },
    ViewMenuSave: function (NewDlg, id) {
        // var NewDlg = $('#main-capnhathoso-Newdlg');
        var list = $('.mnu-list', NewDlg);
        //  console.log($('.mnu-item-selected1', list));
        $.ajax({
            url: adm.urlDefault + '&act=loadPlug&rqPlug=plugin.nhanSu.capnhathoso.Class1, plugin.nhanSu.capnhathoso',
            dataType: 'script',
            data: {
                'subAct': 'save',
                'Class': $('a.mnu-item-selected1', NewDlg).attr('_fn_id'),
                'ID': id
            },
            success: function (dt) {

            }
        });
        $('a.mnu-item-selected1', NewDlg).addClass('ClassSave');

    },
    DayofWeek: function (_date) {

    },
    verifyEmail: function (email) {
        var status = false;
        var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (email.search(emailRegEx) == -1) {
            status = false;
        }
        else {
            status = true;
        }
        return status;
    }
    //    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    //    function next(day) {

    //        var today = new Date();
    //        var today_day = today.getDay();

    //        day = day.toLowerCase();

    //        for (var i = 7; i--;) {
    //            if (day === days[i]) {
    //                day = (i <= today_day) ? (i + 7) : i;
    //                break;
    //            }
    //        }

    //        var daysUntilNext = day - today_day;

    //        return new Date().setDate(today.getDate() + daysUntilNext);

    //    }
};
$(function () {
    adm.preload();
});


/*
 *
 * Copyright (c) 2006-2011 Sam Collett (http://www.texotela.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 1.3.1
 * Demo: http://www.texotela.co.uk/code/jquery/numeric/
 *
 */
(function ($) {
    /*
     * Allows only valid characters to be entered into input boxes.
     * Note: fixes value when pasting via Ctrl+V, but not when using the mouse to paste
      *      side-effect: Ctrl+A does not work, though you can still use the mouse to select (or double-click to select all)
     *
     * @name     numeric
     * @param    config      { decimal : "." , negative : true }
     * @param    callback     A function that runs if the number is not valid (fires onblur)
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @example  $(".numeric").numeric();
     * @example  $(".numeric").numeric(","); // use , as separator
     * @example  $(".numeric").numeric({ decimal : "," }); // use , as separator
     * @example  $(".numeric").numeric({ negative : false }); // do not allow negative values
     * @example  $(".numeric").numeric(null, callback); // use default values, pass on the 'callback' function
     * @example  $(".numeric").numeric({ scale: 2 }); // allow only two numbers after the decimal point.
     * @example  $(".numeric").numeric({ scale: 0 }); // Same as $(".numeric").numeric({ decimal : false });
     * @example  $(".numeric").numeric({ precision: 2 }); // allow only two numbers.
     * @example  $(".numeric").numeric({ precision: 4, scale: 2 }); // allow four numbers with two decimals. (99.99)
     *
     */
    $.fn.numeric = function (config, callback) {
        if (typeof config === 'boolean') {
            config = { decimal: config };
        }
        config = config || {};
        // if config.negative undefined, set to true (default is to allow negative numbers)
        if (typeof config.negative == "undefined") { config.negative = true; }
        // set decimal point
        var decimal = (config.decimal === false) ? "" : config.decimal || ".";
        // allow negatives
        var negative = (config.negative === true) ? true : false;
        // callback function
        callback = (typeof (callback) == "function" ? callback : function () { });
        // scale
        var scale;
        if ((typeof config.scale) == "number") {
            if (config.scale == 0) {
                decimal = false;
                scale = -1;
            }
            else
                scale = config.scale;
        }
        else
            scale = -1;
        // precision
        var precision;
        if ((typeof config.precision) == "number") {
            precision = config.precision;
        }
        else
            precision = 0;
        // set data and methods
        return this.data("numeric.decimal", decimal).data("numeric.negative", negative).data("numeric.callback", callback).data("numeric.scale", scale).data("numeric.precision", precision).keypress($.fn.numeric.keypress).keyup($.fn.numeric.keyup).blur($.fn.numeric.blur);
    };

    $.fn.numeric.keypress = function (e) {
        // get decimal character and determine if negatives are allowed
        var decimal = $.data(this, "numeric.decimal");
        var negative = $.data(this, "numeric.negative");
        // get the key that was pressed
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        // allow enter/return key (only when in an input box)
        if (key == 13 && this.nodeName.toLowerCase() == "input") {
            return true;
        }
        else if (key == 13) {
            return false;
        }
        var allow = false;
        // allow Ctrl+A
        if ((e.ctrlKey && key == 97 /* firefox */) || (e.ctrlKey && key == 65) /* opera */) { return true; }
        // allow Ctrl+X (cut)
        if ((e.ctrlKey && key == 120 /* firefox */) || (e.ctrlKey && key == 88) /* opera */) { return true; }
        // allow Ctrl+C (copy)
        if ((e.ctrlKey && key == 99 /* firefox */) || (e.ctrlKey && key == 67) /* opera */) { return true; }
        // allow Ctrl+Z (undo)
        if ((e.ctrlKey && key == 122 /* firefox */) || (e.ctrlKey && key == 90) /* opera */) { return true; }
        // allow or deny Ctrl+V (paste), Shift+Ins
        if ((e.ctrlKey && key == 118 /* firefox */) || (e.ctrlKey && key == 86) /* opera */ ||
          (e.shiftKey && key == 45)) { return true; }
        // if a number was not pressed
        if (key < 48 || key > 57) {
            var value = $(this).val();
            /* '-' only allowed at start and if negative numbers allowed */
            if (value.indexOf("-") !== 0 && negative && key == 45 && (value.length === 0 || parseInt($.fn.getSelectionStart(this), 10) === 0)) { return true; }
            /* only one decimal separator allowed */
            if (decimal && key == decimal.charCodeAt(0) && value.indexOf(decimal) != -1) {
                allow = false;
            }
            // check for other keys that have special purposes
            if (
                key != 8 /* backspace */ &&
                key != 9 /* tab */ &&
                key != 13 /* enter */ &&
                key != 35 /* end */ &&
                key != 36 /* home */ &&
                key != 37 /* left */ &&
                key != 39 /* right */ &&
                key != 46 /* del */
            ) {
                allow = false;
            }
            else {
                // for detecting special keys (listed above)
                // IE does not support 'charCode' and ignores them in keypress anyway
                if (typeof e.charCode != "undefined") {
                    // special keys have 'keyCode' and 'which' the same (e.g. backspace)
                    if (e.keyCode == e.which && e.which !== 0) {
                        allow = true;
                        // . and delete share the same code, don't allow . (will be set to true later if it is the decimal point)
                        if (e.which == 46) { allow = false; }
                    }
                        // or keyCode != 0 and 'charCode'/'which' = 0
                    else if (e.keyCode !== 0 && e.charCode === 0 && e.which === 0) {
                        allow = true;
                    }
                }
            }
            // if key pressed is the decimal and it is not already in the field
            if (decimal && key == decimal.charCodeAt(0)) {
                if (value.indexOf(decimal) == -1) {
                    allow = true;
                }
                else {
                    allow = false;
                }
            }
        }
            //if a number key was pressed.
        else {
            // If scale >= 0, make sure there's only <scale> characters
            // after the decimal point.
            if ($.data(this, "numeric.scale") >= 0) {
                var decimalPosition = this.value.indexOf(decimal);
                //If there is a decimal.
                if (decimalPosition >= 0) {
                    decimalsQuantity = this.value.length - decimalPosition - 1;
                    //If the cursor is after the decimal.
                    if ($.fn.getSelectionStart(this) > decimalPosition)
                        allow = decimalsQuantity < $.data(this, "numeric.scale");
                    else {
                        integersQuantity = (this.value.length - 1) - decimalsQuantity;
                        //If precision > 0, integers and decimals quantity should not be greater than precision
                        if (integersQuantity < ($.data(this, "numeric.precision") - $.data(this, "numeric.scale")))
                            allow = true;
                        else
                            allow = false;
                    }
                }
                    //If there is no decimal
                else {
                    if ($.data(this, "numeric.precision") > 0)
                        allow = this.value.replace($.data(this, "numeric.decimal"), "").length < $.data(this, "numeric.precision") - $.data(this, "numeric.scale");
                    else
                        allow = true;
                }
            }
            else
                // If precision > 0, make sure there's not more digits than precision
                if ($.data(this, "numeric.precision") > 0)
                    allow = this.value.replace($.data(this, "numeric.decimal"), "").length < $.data(this, "numeric.precision");
                else
                    allow = true;
        }
        return allow;
    };

    $.fn.numeric.keyup = function (e) {
        var val = $(this).val();
        if (val && val.length > 0) {
            // get carat (cursor) position
            var carat = $.fn.getSelectionStart(this);
            // get decimal character and determine if negatives are allowed
            var decimal = $.data(this, "numeric.decimal");
            var negative = $.data(this, "numeric.negative");

            // prepend a 0 if necessary
            if (decimal !== "" && decimal !== null) {
                // find decimal point
                var dot = val.indexOf(decimal);
                // if dot at start, add 0 before
                if (dot === 0) {
                    this.value = "0" + val;
                }
                // if dot at position 1, check if there is a - symbol before it
                if (dot == 1 && val.charAt(0) == "-") {
                    this.value = "-0" + val.substring(1);
                }
                val = this.value;
            }

            // if pasted in, only allow the following characters
            var validChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '-', decimal];
            // get length of the value (to loop through)
            var length = val.length;
            // loop backwards (to prevent going out of bounds)
            for (var i = length - 1; i >= 0; i--) {
                var ch = val.charAt(i);
                // remove '-' if it is in the wrong place
                if (i !== 0 && ch == "-") {
                    val = val.substring(0, i) + val.substring(i + 1);
                }
                    // remove character if it is at the start, a '-' and negatives aren't allowed
                else if (i === 0 && !negative && ch == "-") {
                    val = val.substring(1);
                }
                var validChar = false;
                // loop through validChars
                for (var j = 0; j < validChars.length; j++) {
                    // if it is valid, break out the loop
                    if (ch == validChars[j]) {
                        validChar = true;
                        break;
                    }
                }
                // if not a valid character, or a space, remove
                if (!validChar || ch == " ") {
                    val = val.substring(0, i) + val.substring(i + 1);
                }
            }
            // remove extra decimal characters
            var firstDecimal = val.indexOf(decimal);
            if (firstDecimal > 0) {
                for (var k = length - 1; k > firstDecimal; k--) {
                    var chch = val.charAt(k);
                    // remove decimal character
                    if (chch == decimal) {
                        val = val.substring(0, k) + val.substring(k + 1);
                    }
                }
                // remove numbers after the decimal so that scale matches.
                if ($.data(this, "numeric.scale") >= 0)
                    val = val.substring(0, firstDecimal + $.data(this, "numeric.scale") + 1);
                // remove numbers so that precision matches.
                if ($.data(this, "numeric.precision") > 0)
                    val = val.substring(0, $.data(this, "numeric.precision") + 1);
            }
                // limite the integers quantity, necessary when user delete decimal separator
            else if ($.data(this, "numeric.precision") > 0)
                val = val.substring(0, ($.data(this, "numeric.precision") - $.data(this, "numeric.scale")));

            // set the value and prevent the cursor moving to the end
            this.value = val;
            $.fn.setSelection(this, carat);
        }
    };

    $.fn.numeric.blur = function () {
        var decimal = $.data(this, "numeric.decimal");
        var callback = $.data(this, "numeric.callback");
        var val = this.value;
        if (val !== "") {
            var re = new RegExp("^\\d+$|^\\d*" + decimal + "\\d+$");
            if (!re.exec(val)) {
                callback.apply(this);
            }
        }
    };

    $.fn.removeNumeric = function () {
        return this.data("numeric.decimal", null).data("numeric.negative", null).data("numeric.callback", null).unbind("keypress", $.fn.numeric.keypress).unbind("blur", $.fn.numeric.blur);
    };

    // Based on code from http://javascript.nwbox.com/cursor_position/ (Diego Perini <dperini@nwbox.com>)
    $.fn.getSelectionStart = function (o) {
        if (o.createTextRange) {
            var r = document.selection.createRange().duplicate();
            r.moveEnd('character', o.value.length);
            if (r.text === '') { return o.value.length; }
            return o.value.lastIndexOf(r.text);
        } else { return o.selectionStart; }
    };

    // set the selection, o is the object (input), p is the position ([start, end] or just start)
    $.fn.setSelection = function (o, p) {
        // if p is number, start and end are the same
        if (typeof p == "number") { p = [p, p]; }
        // only set if p is an array of length 2
        if (p && p.constructor == Array && p.length == 2) {
            if (o.createTextRange) {
                var r = o.createTextRange();
                r.collapse(true);
                r.moveStart('character', p[0]);
                r.moveEnd('character', p[1]);
                r.select();
            }
            else if (o.setSelectionRange) {
                o.focus();
                o.setSelectionRange(p[0], p[1]);
            }
        }
    };

})(jQuery);