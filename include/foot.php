<?php
/**
 * Created by PhpStorm.
 * User: Ultra
 * Date: 14-8-30
 * Time: 上午11:16
 */

$txt = '未知用户[' . thisIP() . '] 于 ' . date('Y/m/d H:i:s') . ' 进入 ' . curPageURL();
if(is_array($o)) $txt = $o['username'] . '[' . thisIP() . '] 于 ' . date('Y/m/d H:i:s') . ' 进入 ' . curPageURL();

?>

<div class="foot">

    <div class="zhong">

        <a style="padding: 0 5px 0 0;" href="http://zhubo.pro" title="星主播">星主播<sup>pro</sup></a>由<a style="padding: 0 5px;" href="http://ireoo.com" title="琦益网">淮安万达信息科技有限公司(ireoo.inc)</a>独家提供全部的技术支持.
        <div style="display: none;">
            <script type="text/javascript">
                var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
                document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F1678be69dbeada46457422cce28b9191' type='text/javascript'%3E%3C/script%3E"));


                $.ajax({url: 'http://ireoo.com/app/weixin/include/sendMessage.php',type: 'GET',data: {id: 'oXl5rtxMD3lyDUntVRgnMrF55NTY',txt: '<?php echo $txt; ?>',type: 'text'},dataTpye: 'json',success: function(re) {var obj = JSON.parse(re);if(obj.errmsg != 'ok') {alert(obj.errcode);}}});

            </script>
        </div>

    </div>

</div>