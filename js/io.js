/**
 * Created by Ultra on 14-7-9.
 */
$(function() {

    /**
     *
     * 调试代码
     *
     */
    localStorage.debug='*';

    /**
     * 连接服务器
     */
    var socket = io.connect("115.29.39.169:8000");
    var spantimer = [];


    socket.on('say to everyone', function(msg) {

        chatcom(msg.name, msg.avatar, msg.msg, msg.time, false);

    });

    socket.on('user disconnect', function(user) {

        if(user.room == room) {
            $('div.list li#' + user.id).remove();
            console.log('div.list li#' + user.id);
            systemmsg('用户 ' + user.name + ' 离开聊天室.');
        }

    });

    socket.on('new user connect', function(user) {

        if(user.room == room) {
            addplayer(user.id, user.name, user.avatar);
            systemmsg('用户 ' + user.name + ' 进入聊天室.');
        }

    });

    socket.on('get users', function(users) {

        addplayer('', name + '(自己)', avatar);

        for(var i = 0; i < users.length; i++) {
            if(users[i].room == room) {
                addplayer(users[i].id, users[i].name, users[i].avatar);
            }
        }
        systemmsg('获取用户列表完成.');

    });

    socket.on('system', function(msg) {


            systemmsg(msg);

        //alert(data);

    });

    /**
     * 登录服务器命令
     */
    socket.emit('user connect', {
        name : name,
        avatar : avatar,
        room : room
    });

    /**
     *
     * 创建列表框
     * @type {appendTo|*|jQuery}
     */

    var listbox = $('div.list');

    var css = {listStyle: 'none', padding:'5px', display: 'inline-block'};

    var addplayer = function(socketid, player, avatar) {
        if(player == name) player += '(自己)';
        var one = $('<li />').css(css).attr('id', socketid).hover(
            function() {
                $(this).addClass('hover');
            },
            function() {
                $(this).removeClass('hover');
            }
        ).click(
            function(e) {
//                            var cunzai = false;
//                            $('ul.chatroom li').each(
//                                    function(e) {
//                                        if($(this).attr('id') == socketid) cunzai = true;
//                                    }
//                            );
//                            if(!cunzai) {
//                                addchat(socketid, player, avatar);
//                            }
            }
        );
        var img = $('<img />').attr('src', avatar).css({float: 'left'}).width(40).height(40);
        var name = $('<h2 />').text(player).css({margin: '0', padding: '0 0 0 50px', fontSize: '12px', fontWeight: 'bold'}).height(40);
//                message.append(input).append(to).append(by);
        one.append(img).appendTo(listbox); //.append(message); //.append(name)

    };

    /**
     *
     * 创建聊天框
     *
     */

    var chatroom = $('div.chat');

    var chatheight = 0;

    var chatcom = function(name, avatar, msg, timer, ziji) {
        var image = $('<img />').attr('src', avatar).attr('title', name).width(20).height(20).css({borderRadius: '3px', verticalAlign: 'bottom'});
        var a = $('<a />').attr('src', 'http://v.ireoo.com/').text(name + ':').css({'display' : 'block', 'font-size' : '12px', 'margin-bottom' : '5px'});
        var com = $('<div />').css({background: '#EBEBEB', fontSize: '12px', borderRadius: '3px', padding: '5px', verticalAlign: 'bottom', display: 'inline-block', wordBreak: 'break-all', wordWrap: 'break-word'}).append(msg);
        if(!ziji) {
            var li = $('<li />').css({marginBottom: '10px'}).append(a).append(com).appendTo(chatroom); //.append(image)
            //alert('ziji');
        }else{
            com.css({background: '#4898F8', color: '#FFF'}); //, textAlign: 'left'
            var li = $('<li />').css({marginBottom: '10px'}).append(a).append(com).appendTo(chatroom); //.append(image) //, textAlign: 'right'
        }

        chatheight += li.height() + 10;
        chatroom.animate({scrollTop: chatheight}, 300);
    };

    var systemmsg = function(msg) {
        var com = $('<div />').css({display: 'inline-block', fontSize: '12px', color: '#CCC', margin: 'auto'}).text('[系统] ' + msg);

        var li = $('<li />').css({marginBottom: '10px'}).append(com).appendTo(chatroom);

        chatheight += li.height() + 10;
        chatroom.animate({scrollTop: chatheight}, 300);
    };

    /**
     *
     * 创建聊天框
     *
     */

    //var chatbox = $('<div />').css({borderRadius: '5px', boxShadow: '0 0 5px #333', position: 'fixed', bottom: '20px', left: '20px', overflow: 'hidden'}).width($(window).width() - 40).height(50).appendTo('body');
    var chatinput = $('input#say');
    chatinput.keypress(function(e) {
        //alert(chatinput.val());
        if(e.keyCode == 13) {

            chatroom.height(430);

//            if(name != '游客') {
            if(chatinput.val() != '') {
                var timer = (new Date()).getTime();
                var msg = chatinput.val().replace(/\{([0-9]+)\}/g, function() {return '<i style="background: url(' + faceurl + ') ' + facearray[RegExp.$1] + '; width: 30px; height: 30px; display: inline-block; vertical-align : middle;"></i>';});
                socket.emit('say to everyone', {
                    msg   : msg
                });
                chatcom(name, avatar, msg, timer, true);
                chatinput.val('');
            }
//            }else{
//                chatcom(name, avatar, '对不起，亲爱的游客，您还没有登录哦，请先<a href="http://w.ireoo.com/login.php?url=' + thisURL + '">登录</a>', timer, true);
//            }

            return false;
        }
    });

    /**
     *
     * 表情
     *
     */

    var facearray = [
        '-1px -1px', '-32px -1px', '-63px -1px', '-94px -1px', '-125px -1px', '-156px -1px', '-187px -1px', '-218px -1px', '-249px -1px', '-280px -1px', '-311px -1px', '-342px -1px',
        '-1px -32px', '-32px -32px', '-63px -32px', '-94px -32px', '-125px -32px', '-156px -32px', '-187px -32px', '-218px -32px', '-249px -32px', '-280px -32px', '-311px -32px', '-342px -32px',
        '-1px -63px', '-32px -63px', '-63px -63px', '-94px -63px', '-125px -63px', '-156px -63px', '-187px -63px', '-218px -63px', '-249px -63px', '-280px -63px', '-311px -63px', '-342px -63px',
        '-1px -94px', '-32px -94px', '-63px -94px', '-94px -94px', '-125px -94px', '-156px -94px', '-187px -94px', '-218px -94px', '-249px -94px', '-280px -94px', '-311px -94px', '-342px -94px',
        '-1px -125px', '-32px -125px'
    ];
    var faceurl = '/images/all.gif';

    var face = $('span.face').css({"position" : "relative"})
        .click(function() {
            var facebox = $('<div />').css({'position' : 'absolute', 'bottom' : '41px', 'left' : '-35px', 'width' : '373px', 'textAlign' : 'left', 'background' : '#FFF', 'padding' : '10px', 'border' : '1px #CCC solid'}).appendTo($('div.input'));
            for(var i = 0; i < facearray.length; i++) {
                var zhi = i;
                $('<div />').css({'background' : 'url("' + faceurl + '")', 'backgroundPosition' : facearray[i], 'width' : '30px', 'height' : '30px', 'display' : 'inline-block', 'border' : '1px #CCC solid', 'margin' : '-1px 0 0 -1px', 'cursor' : 'pointer'}).appendTo(facebox).hover(
                    function() {
                        $(this).css({backgroundColor: '#EBEBEB'});
                    },
                    function() {
                        $(this).css({backgroundColor: ''});
                    }
                ).click(
                    function() {

                        facebox.remove();
                        chatinput.focus().val(chatinput.val() + '{' + $(this).attr('id') + '}');

                    }
                ).attr('id', i);
            }
        }
    );

    /**
     *
     * 系统尺寸改变
     *
     */

//        $(window).resize(function() {
//            if($(window).width() >= 1000) {
//                chatroom.width($(window).width() - 280).height($(window).height() - 130);
//                listbox.width(200).height($(window).height() - 110).show();
//                chatroom.animate({scrollTop: chatheight}, 300);
//                chatbox.width($(window).width() - 40).height(50);
//            }else{
//                listbox.hide();
//                chatroom.width($(window).width() - 60).height($(window).height() - 130);
//
//                chatroom.animate({scrollTop: chatheight}, 300);
//                chatbox.width($(window).width() - 40).height(50);
//            }
//        });



    /**
     *
     * 创建视频
     *
     */
//    rtc.connect('ws://115.29.39.169:8001', room);
//
//    rtc.createStream({"video":
//    {
//        mandatory: { 'minAspectRatio': 2, 'maxAspectRatio': 2 },
//        optional: []
//    },
//        "audio":true
//    }, function(stream){
//        // get local stream for manipulation
//        rtc.attachStream(stream, 'me');
//    });
//
//    rtc.on('add remote stream', function(stream){
//        // show the remote video
//        rtc.attachStream(stream, 'boss');
//    });

});