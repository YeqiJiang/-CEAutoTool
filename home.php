<?php
header("Content-type:text/html;charset=utf-8");
	// session_start();
	// include_once "include/lib.php";
	// $id=$_SESSION['id'];
?> 
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head runat="server">
    <meta http-equiv="Content-data-type" content="text/html; charset=utf-8;"/>
    <title>CEAutoTool</title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="stylesheet" href="css/MyCSS.css">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link href="css/bootstrap-select.min.css" rel="stylesheet">
     <link href="css/bootstrap.css" rel="stylesheet">
      <link href="css/sweetalert2.min.css" rel="stylesheet">
    <style type="text/css">
    .box { position:fixed; top:10px; left:1080px; min-width:280px; min-height:500px; border:1px solid #666; background:#f4f4f4; }
    .box .title { background:#3F3F3F; height:30px; min-width:250px; cursor:move;box-shadow: 0px 6px 5px; }
    .box .close {color:#fff; display:block; width:22px; height:18px; line-height:20px; text-align:center; cursor:pointer; position:absolute; right:5px; top:5px; font-weight:bold; }
    /*.con { padding:20px; }*/
    .bg_change_size { background:url('images/size2.png') no-repeat; }
</style>
    <script type="text/javascript" src="js/jquery-2.2.1.min.js"></script>
     <script type="text/javascript" src="js/bootstrap-select.js"></script>
     <!--//制作自定义滚动条的jq插件 -->
    <script type="text/javascript" src="js/jquery.nicescroll.min.js"></script>
   <!--take "screenshots" of webpages-->
    <script type="text/javascript" src="js/html2canvas.min.js"></script>
    <!--jQuery旋转插件jqueryrotate-->
    <script type="text/javascript" src="js/MyJS.js"></script>
    <!--json相关js-->
   <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/cycle.js"></script>
    <script type="text/javascript" src="js/json_parse.js"></script>
     <script type="text/javascript" src="js/json_parse_state.js"></script>
     <script type="text/javascript" src="js/json2.js"></script>
      <script type="text/javascript" src="js/demo.js"></script>
       <script type="text/javascript" src="js/sweetalert2.min.js"></script>
       <script src="js/es6-promise.min.js"></script>
       <script src="js/finally.js"></script>
</head>
<body>
<div id="ShowDiv" style="position: absolute;color:#FFFFFF;opacity: 0.6;z-index: 100;"></div>
<div id="ID_Root" class="Root">
    <div id="ID_RootContainer" class="RootContainer">
    <!--最左侧保存的那一栏-->
        <div id="ID_ControlPanel" class="ControlPanel">
            <div id="ID_LoadFile" title="返回主页" class="LoadFile">
                <img src="images/fanhui.png" class="ControlPanelButtonImg">
            </div>
            <div id="ID_SaveFile" title="保存" class="SaveFile">
                <img src="images/savefile.png" class="ControlPanelButtonImg">
            </div>
            <div id="ID_ExportFile" title="提交" class="ExportFile">
                <img src="images/exportfile.png" class="ControlPanelButtonImg">
            </div>
            <div id="ID_PlayMode" title="切换到仿真模式" class="PlayMode">
                <img src="images/playmode.png" class="ControlPanelButtonImg">
            </div>
            <div id="ID_EditMode" title="切换到编辑模式" class="EditMode">
                <img src="images/editmode.png" class="ControlPanelButtonImg">
            </div>
            <form id="ID_UploadFileForm" method="post" enctype="multipart/form-data" action="asp/LoadNativeFile.aspx">
                <input id="ID_UploadFileInput" type="file" name="UploadFileInput" style="display: none;" />
            </form>
        </div>
        <!--<上边系统状态那一栏>-->
        <div id="ID_StatePanel" class="StatePanel">
            <div class="SystemStateContainer">
                <div class="SystemStateLeft">系统状态</div>
                <div id="ID_SystemState" class="SystemStateRight">待机</div>
            </div>
            <div id="ID_DetailContainer" class="DetailContainer">
                <div class="DetailLeft">当前选中</div>
                <div class="DetailRight">
                    <div id="ID_DetailIDPanel" class="DetailEleContainer DetailEleGrey" style="left: 5px;top: 2px;">
                        <div class="DetailEleLeft">ID</div>
                        <div id="ID_DetailID" class="DetailEleRight">-</div>
                    </div>
                    <div id="ID_DetailTypePanel" class="DetailEleContainer DetailEleGrey" style="left: 5px;top: 22px;">
                        <div class="DetailEleLeft">类型</div>
                        <div id="ID_DetailType" class="DetailEleRight">-</div>
                    </div>
                    <div id="ID_DetailPositionPanel" class="DetailEleContainer DetailEleGrey" style="left: 170px;top: 2px;">
                        <div class="DetailEleLeft">位置</div>
                        <div id="ID_DetailPosition" class="DetailEleRight">-</div>
                    </div>
                    <div id="ID_DetailCommentPanel" class="DetailEleContainer DetailEleGrey" style="left: 170px;top: 22px;">
                        <div class="DetailEleLeft">设备名</div>
                        <div id="ID_DetailComment" class="DetailEleRight">-</div>
                    </div>
                    <!--接口要删掉-->

                    <div id="ID_DetailInterfaceList" class="DetailInterfaceList"></div>
                    <!-- <div id="ID_DetailWeightPanel" class="DetailEleContainer DetailEleGrey" style="left: 335px;top: 22px;">
                        <div class="DetailEleLeft">ID(输入)</div>
                        <div  id="ID_DetailWeight" class="DetailEleRight">-</div>
                    </div> -->
                    <div id="ID_DetailSpeedPanel" class="DetailEleContainer DetailEleGrey" style="left: 335px;top: 2px;">
                        <div class="DetailEleLeft">流速</div>
                        <div  id="ID_DetailSpeed" class="DetailEleRight">-</div>
                    </div>
                </div>
            </div>
        </div>
        <!--<左侧栏>-->
        <div id="ID_TemplatePanel" class="TemplatePanel">
            <div id="ID_TemplateControl" class="TemplateControl">
                <div id="ID_TCAllOff" class="TCButton TCAllOff">全部收起</div>
                <div id="ID_TCAllOn" class="TCButton TCAllOn">全部展开</div>

                <!--手动折叠和自动折叠去掉-->

            </div>
            <ul class="TemplatePanelFirstUL">
                <li>
                    <div id="ID_CalTankTab" onclick="TemplateListTabClick(0)">计量罐</div>
                    <ul id="ID_CalTankTabUL" class="TemplatePanelSecondUL CalTankTabUL">
                        <li>
                            <div data-type="Template" data-name="sodatank" data-imgw="49" data-imgh="72">
                                <img src="images/sodatank.png">
                                <span>碱罐</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="gaugetank" data-imgw="49" data-imgh="72">
                                <img src="images/gaugetank.png">
                                <span>中性罐</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="acidtank" data-imgw="49" data-imgh="72">
                                <img src="images/acidtank.png">
                                <span>酸罐</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div id="ID_StoTankTab" onclick="TemplateListTabClick(1)">大储罐</div>
                    <ul id="ID_StoTankTabUL" class="TemplatePanelSecondUL StoTankTabUL">
                        <li>
                            <div data-type="Template" data-name="sodastotank" data-imgw="92" data-imgh="114">
                                <img src="images/sodastotank.png">
                                <span>碱储罐</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="waterstotank" data-imgw="92" data-imgh="114">
                                <img src="images/waterstotank.png">
                                <span>纯水罐</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="danti" data-imgw="92" data-imgh="114">
                                <img src="images/danti.png">
                                <span>大单体</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="acidstotank" data-imgw="92" data-imgh="114">
                                <img src="images/acidstotank.png">
                                <span>酸储罐</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="jar" data-imgw="92" data-imgh="114">
                                <img src="images/jar.png">
                                <span>母液</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div id="ID_ReactorTab" onclick="TemplateListTabClick(2)">反应釜</div>
                    <ul id="ID_ReactorTabUL" class="TemplatePanelSecondUL">
                        <li>
                            <div data-type="Template" data-name="reactor" data-imgw="92" data-imgh="100" style="height: 130px;">
                                <img src="images/reactor.png" style="width: 92px;height: 100px;margin-left: -46px;margin-top: -60px;">
                                <span style="margin-top: 48px;">反应釜</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div id="ID_FuPeiTankTab" onclick="TemplateListTabClick(3)">复配罐</div>
                    <ul id="ID_FuPeiTankTabUL" class="TemplatePanelSecondUL">
                        <li>
                            <div data-type="Template" data-name="fupeitank" data-imgw="92" data-imgh="100" style="height: 130px;">
                                <img src="images/fupeitank.png" style="width: 92px;height: 100px;margin-left: -46px;margin-top: -60px;">
                                <span style="margin-top: 48px;">复配罐</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div id="ID_MixTankTab" onclick="TemplateListTabClick(4)">预混罐</div>
                    <ul id="ID_MixTankTabUL" class="TemplatePanelSecondUL">
                        <li>
                            <div data-type="Template" data-name="mixtank" data-imgw="92" data-imgh="100" style="height: 130px;">
                                <img src="images/mixtank.png" style="width: 92px;height: 100px;margin-left: -46px;margin-top: -60px;">
                                <span style="margin-top: 48px;">预混罐</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div id="ID_ValveTab" onclick="TemplateListTabClick(5)">阀门</div>
                    <ul id="ID_ValveTabUL" class="TemplatePanelSecondUL">
                        <li>
                            <div data-type="Template" data-name="handvalve2" data-imgw="25" data-imgh="25" style="height: 50px;">
                                <img src="images/handvalve2.png" style="width: 25px;height: 25px;margin-left: -12px;margin-top: -22px;">
                                <span style="margin-top: 8px;">手动阀横</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="handvalve1" data-imgw="25" data-imgh="25" style="height: 50px;">
                                <img src="images/handvalve1.png" style="width: 25px;height: 25px;margin-left: -12px;margin-top: -22px;">
                                <span style="margin-top: 7px;">手动阀竖</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="dropvalve" data-imgw="40" data-imgh="40" style="height: 70px;">
                                <img src="images/dropvalve.png" style="width: 40px;height: 40px;margin-left: -20px;margin-top: -28px;">
                                <span style="margin-top: 16px;">滴加阀</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="switchvalve" data-imgw="40" data-imgh="40" style="height: 70px;">
                                <img src="images/switchvalve.png" style="width: 40px;height: 40px;margin-left: -20px;margin-top: -28px;">
                                <span style="margin-top: 16px;">开关阀</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <!-- <li>
                    <div id="ID_ValveTab" onclick="TemplateListTabClick(5)">滴加阀</div>
                    <ul id="ID_ValveTabUL" class="TemplatePanelSecondUL">
                        <li>
                            <div data-type="Template" data-name="dropvalve" data-imgw="40" data-imgh="40" style="height: 70px;">
                                <img src="images/dropvalve.png" style="width: 40px;height: 40px;margin-left: -20px;margin-top: -28px;">
                                <span style="margin-top: 16px;">滴加阀</span>
                            </div>
                        </li>
                    </ul>
                </li> -->
                <li>
                    <div id="ID_ConvertTab" onclick="TemplateListTabClick(6)">管道接口</div>
                    <ul id="ID_ConvertTabUL" class="TemplatePanelSecondUL ConvertTabUL">
                        <li>
                            <div data-type="Template" data-name="convert11" data-imgw="17" data-imgh="1">
                                <img src="images/convert11.png" style="width: 17px;height: 11px;margin-left: -8px;margin-top: -5px;">
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="convert12" data-imgw="11" data-imgh="17">
                                <img src="images/convert12.png" style="width: 11px;height: 17px;margin-left: -5px;margin-top: -8px;">
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="convert13" data-imgw="17" data-imgh="11">
                                <img src="images/convert13.png" style="width: 17px;height: 11px;margin-left: -8px;margin-top: -5px;">
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="convert14" data-imgw="11" data-imgh="17">
                                <img src="images/convert14.png" style="width: 11px;height: 17px;margin-left: -5px;margin-top: -8px;">
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="convert21" data-imgw="11" data-imgh="11">
                                <img src="images/convert21.png" style="width: 11px;height: 11px;margin-left: -5px;margin-top: -5px;">
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="convert22" data-imgw="11" data-imgh="11">
                                <img src="images/convert22.png" style="width: 11px;height: 11px;margin-left: -5px;margin-top: -5px;">
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="convert23" data-imgw="11" data-imgh="11">
                                <img src="images/convert23.png" style="width: 11px;height: 11px;margin-left: -5px;margin-top: -5px;">
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="convert24" data-imgw="11" data-imgh="11">
                                <img src="images/convert24.png" style="width: 11px;height: 11px;margin-left: -5px;margin-top: -5px;">
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div id="ID_PipeTab" onclick="TemplateListTabClick(7)">管道</div>
                    <ul id="ID_PipeTabUL" class="TemplatePanelSecondUL">
                        <li>
                            <div data-type="Template" data-name="line11" data-imgw="45" data-imgh="4" style="height: 36px;">
                                <img src="images/line11.png" style="width: 45px;height: 4px;margin-left: -22px;margin-top: -8px;">
                                <span style="margin-top: 4px;">水管横</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="line12" data-imgw="4" data-imgh="45" style="height: 70px;">
                                <img src="images/line12.png" style="width: 4px;height: 45px;margin-left: -2px;margin-top: -28px;">
                                <span style="margin-top: 20px;">水管竖</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div id="ID_PumpTab" onclick="TemplateListTabClick(8)">泵</div>
                    <ul id="ID_PumpTabUL" class="TemplatePanelSecondUL">
                        <li>
                            <div data-type="Template" data-name="pump" data-imgw="55" data-imgh="55" style="height: 75px;">
                                <img src="images/pump.png" style="width: 55px;height: 55px;margin-left: -27px;margin-top: -38px;">
                                <span style="margin-top: 18px;">泵</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div id="ID_ElectTab" onclick="TemplateListTabClick(9)">电机</div>
                    <ul id="ID_ElectTabUL" class="TemplatePanelSecondUL">
                        <li>
                            <div data-type="Template" data-name="elect" data-imgw="63" data-imgh="100" style="height: 130px;">
                                <img src="images/elect.png" style="width: 63px;height: 100px;margin-left: -31px;margin-top: -60px;">
                                <span style="margin-top: 48px;">电机</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <!-- <li>
                    <div id="ID_SensorTab" onclick="TemplateListTabClick(10)">传感器状态标签</div>
                    <ul id="ID_SensorTabUL" class="TemplatePanelSecondUL">
                        <li>
                            <div data-type="Template" data-name="tem_sensor" data-imgw="49" data-imgh="27" style="height:65px;">
                                <img src="images/tem_sensor.png" style="margin-left: -28px;margin-top: -25px;">
                                <span style="margin-top:10px">温度传感器</span>
                            </div>
                        </li>
                         <li>
                            <div data-type="Template" data-name="gravity_sensor" data-imgw="49" data-imgh="27" style="height:65px;">
                                <img src="images/gravity_sensor.png" style="margin-left: -28px;margin-top: -25px;">
                                <span style="margin-top:10px">应力传感器</span>
                            </div>
                        </li>
                         <li>
                            <div data-type="Template" data-name="ph_sensor" data-imgw="49" data-imgh="27" style="height:65px;">
                                <img src="images/ph_sensor.png" style="margin-left: -28px;margin-top: -25px;">
                                <span style="margin-top:10px">PH传感器</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="ele_sensor" data-imgw="49" data-imgh="27" style="height:65px;">
                                <img src="images/ele_sensor.png" style="margin-left: -28px;margin-top: -25px;">
                                <span style="margin-top:10px">电流传感器</span>
                            </div>
                        </li>
                    </ul>
                </li> -->
                <li>
                    <div id="ID_SensorTab" onclick="TemplateListTabClick(10)">传感器</div>
                    <ul id="ID_SensorTabUL" class="TemplatePanelSecondUL">
                        <li>
                            <div data-type="Template" data-name="tem_sensor" data-imgw="49" data-imgh="27" style="height:65px;">
                                <img src="images/tem_sensor.png" style="margin-left: -28px;margin-top: -25px;">
                                <span style="margin-top:10px">温度传感器</span>
                            </div>
                        </li>
                         <li>
                            <div data-type="Template" data-name="gravity_sensor" data-imgw="49" data-imgh="27" style="height:65px;">
                                <img src="images/gravity_sensor.png" style="margin-left: -28px;margin-top: -25px;">
                                <span style="margin-top:10px">应力传感器</span>
                            </div>
                        </li>
                         <li>
                            <div data-type="Template" data-name="ph_sensor" data-imgw="49" data-imgh="27" style="height:65px;">
                                <img src="images/ph_sensor.png" style="margin-left: -28px;margin-top: -25px;">
                                <span style="margin-top:10px">PH传感器</span>
                            </div>
                        </li>
                        <li>
                            <div data-type="Template" data-name="ele_sensor" data-imgw="49" data-imgh="27" style="height:65px;">
                                <img src="images/ele_sensor.png" style="margin-left: -28px;margin-top: -25px;">
                                <span style="margin-top:10px">电流传感器</span>
                            </div>
                        </li>
                    </ul>
                </li>
                 <li>
                    <div id="ID_AlarmTab" onclick="TemplateListTabClick(11)">高温报警警示条</div>
                    <ul id="ID_AlarmTabUL" class="TemplatePanelSecondUL">
                        <li>
                            <div data-type="Template" data-name="alarm" data-imgw="35" data-imgh="139" style="height:190px;">
                                <img src="images/alarm.png" style="margin-left:-20px;margin-top: -86px;">
                                <span style="margin-top:70px;">高温报警</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!--绘图区域，宽高度是js定义的，还没看懂他写的啥-->
        <div id="ID_WorkbenchPanel" class="WorkbenchPanel">
            <div id="ID_Workbench" data-type="Workbench" class="Workbench"></div>
            <!-- 因为要固定绘画区域的宽高，所以这里把可拓展的功能给取消了 -->
            <!--<div id="ID_WorkbenchExpandUp" class="WorkbenchExpand WorkbenchExpandUp">+</div>
            <div id="ID_WorkbenchExpandDown" class="WorkbenchExpand WorkbenchExpandDown">+</div>
            <div id="ID_WorkbenchExpandLeft" class="WorkbenchExpand WorkbenchExpandLeft">+</div>
            <div id="ID_WorkbenchExpandRight" class="WorkbenchExpand WorkbenchExpandRight">+</div>
            <div id="ID_WorkbenchShrinkUp" class="WorkbenchShrink WorkbenchShrinkUp">-</div>
            <div id="ID_WorkbenchShrinkDown" class="WorkbenchShrink WorkbenchShrinkDown">-</div>
            <div id="ID_WorkbenchShrinkLeft" class="WorkbenchShrink WorkbenchShrinkLeft">-</div>
            <div id="ID_WorkbenchShrinkRight" class="WorkbenchShrink WorkbenchShrinkRight">-</div>-->
            <!--<div id="ID_WorkbenchCornerLU" class="WorkbenchCorner" style="left: 0px;top: 0px;background-position: 0px 0px;"></div>
            <div id="ID_WorkbenchCornerRU" class="WorkbenchCorner" style="left: 1040px;top: 0px;background-position: 30px 0px;"></div>
            <div id="ID_WorkbenchCornerLD" class="WorkbenchCorner" style="left: 0px;top: 520px;background-position: 0px 30px;"></div>
            <div id="ID_WorkbenchCornerRD" class="WorkbenchCorner" style="left: 1040px;top: 520px;background-position: 30px 30px;"></div>-->
            <!--绘图区域的线-->
            <div id="ID_WorkbenchEdgeUp" class="WorkbenchEdge" style="width: 1366px;height: 2px;left: 0px;top: 0px;"></div>
            <div id="ID_WorkbenchEdgeDown" class="WorkbenchEdge" style="width: 1366px;height: 2px;left: 0px;top: 768px;"></div>
            <div id="ID_WorkbenchEdgeLeft" class="WorkbenchEdge" style="width: 2px;height: 768px;left: 0px;top: 0px;"></div>
            <div id="ID_WorkbenchEdgeRight" class="WorkbenchEdge" style="width: 2px;height: 768px;left: 1366px;top: 0px;"></div>
            <div id="ID_CRect1" class="CRect"></div>
            <div id="ID_CRect2" class="CRect"></div>
            <div id="ID_CRect3" class="CRect"></div>
            <div id="ID_CRect4" class="CRect"></div>
            <div id="ID_CRect5" class="CRect"></div>
            <div id="ID_CRect6" class="CRect"></div>
            <div id="ID_CRect7" class="CRect"></div>
            <div id="ID_Wire1" class="Wire"></div>
            <div id="ID_Wire2" class="Wire"></div>
            <div id="ID_Wire3" class="Wire"></div>
            <div id="ID_Wire4" class="Wire"></div>
            <div id="ID_Wire5" class="Wire"></div>
            <div id="ID_Point" class="Point"></div>
            <div id="ID_RButtonMenu" data-type="RButtonMenu" class="RButtonMenu">
                <img id="ID_RButtonMenuBKImage" src="" />
                <div id="ID_RButtonMenuOption1" data-type="RButtonMenuOption" class="RButtonMenuOption RButtonMenuOption1">输入</div>
                
                <div id="ID_RButtonMenuOption4" data-type="RButtonMenuOption" class="RButtonMenuOption RButtonMenuOption2">删除</div>
                <!--
                    <div id="ID_RButtonMenuOption2" data-type="RButtonMenuOption" class="RButtonMenuOption RButtonMenuOption2">备注</div>
                <div id="ID_RButtonMenuOption3" data-type="RButtonMenuOption" class="RButtonMenuOption RButtonMenuOption3">重命名</div>
                
                <div id="ID_RButtonMenuOption5" data-type="RButtonMenuOption" class="RButtonMenuOption RButtonMenuOption5">全局</div>-->
            </div>
            <div id="ID_ProgressBar" class="ProgressBar">
                <div id="ID_Progress" style="position: absolute;width: 100px;height: 7px;background-color: #FFFFFF;border-radius: 3px;"></div>
                <div id="ID_ProgressButton" style="position: absolute;width: 7px;height: 7px;left: 94px;border-radius: 3px;background-color: #FF6A00;"></div>
            </div>
            <div id="ID_SimCtrlPanel" class="SimCtrlPanel">
                <div id="ID_Play" class="SimCtrlButton PlayPause">
                    <img src="images/play.png" class="SimCtrlPanelImg" />
                </div>
                <div id="ID_Pause" class="SimCtrlButton PlayPause">
                    <img src="images/pause.png" class="SimCtrlPanelImg" />
                </div>
                <div id="ID_Backward" class="SimCtrlButton Backward">
                    <img src="images/backward.png" class="SimCtrlPanelImg" />
                </div>
                <div id="ID_Forward" class="SimCtrlButton Forward">
                    <img src="images/forward.png" class="SimCtrlPanelImg" />
                </div>
                <div id="ID_Replay" class="SimCtrlButton Replay">
                    <img src="images/replay.png" class="SimCtrlPanelImg" />
                </div>
            </div>
            <div id="ID_WorkbenchStatePanel" class="WorkbenchStatePanel">
                <div id="ID_WorkbenchWidth" class="WorkbenchStateTab WorkbenchWidth">长度：1920</div>
                <div id="ID_WorkbenchHeight" class="WorkbenchStateTab WorkbenchHeight">高度：1080</div>
                <div id="ID_PipeSpeed" class="WorkbenchStateTab PipeSpeed">水管：50kg/h</div>
            </div>
            <div class="CEAutoToolLogo">CEAutoTool</div>
        </div>
    </div>
    <div id="ID_PageFoot" class="PageFoot">
        Copyright 2016 All Rights Reserved. @版权所有：<a href="http://www.sophtek.cn/">北京慧物科联科技有限公司</a>
    </div>
</div>
<!--//1366*768-->
<div id="ID_PopRoot" class="PopRoot">
        <div id="ID_PopMenuContainer" class="PopMenuContainer1">
            <div id="ID_PopSaveFile" class="PopSaveFile">
                <input id="ID_PopSaveFileInput" type="text" class="PopSaveFileInput" />
                <label for="ID_PopSaveFileInput" class="PopSaveFileLabel1"><br>保存为:</label>
                <label for="ID_PopSaveFileInput" class="PopSaveFileLabel2"><br>.ceatwol</label>
                <span id="ID_PopSaveFileConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopSaveFileCancel" class="PopCancel">取消</span>
            </div>
            <div id="ID_PopExportFile" class="PopSaveFile">
                <input id="ID_PopExportFileInput" type="text" class="PopSaveFileInput" />
                <label for="ID_PopExportFileInput" class="PopSaveFileLabel1"><br>导出为:</label>
                <label for="ID_PopExportFileInput" class="PopSaveFileLabel2"><br>.txt</label>
                <span id="ID_PopExportFileConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopExportFileCancel" class="PopCancel">取消</span>
            </div>
            <!--更改：将右键点击出现的备注、id,名称去掉，只留下一个输入和删除。-->
            <!--<div id="ID_PopComment" class="PopSaveFile">
                <input id="ID_PopCommentInput" type="text" class="PopSaveFileInput" />
                <label for="ID_PopCommentInput" class="PopSaveFileLabel1"><br>备注:</label>
                <label for="ID_PopCommentInput" class="PopSaveFileLabel2"></label>
                <span id="ID_PopCommentConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopCommentCancel" class="PopCancel">取消</span>
            </div>-->
            <!--<div id="ID_PopRename" class="PopSaveFile">
                <input id="ID_PopRenameInput" type="text" class="PopSaveFileInput" />
                <label for="ID_PopRenameInput" class="PopSaveFileLabel1"><br>ID:</label>
                <label for="ID_PopRenameInput" class="PopSaveFileLabel2"></label>
                <span id="ID_PopRenameConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopRenameCancel" class="PopCancel">取消</span>
            </div>-->
            <!--<div id="ID_PopWeight" class="PopSaveFile">
                <input id="ID_PopWeightInput" type="text" class="PopSaveFileInput" />
                <label for="ID_PopWeightInput" class="PopSaveFileLabel1 PopSaveFileLabel"><br>名称:</label>
                <label for="ID_PopWeightInput" class="PopSaveFileLabel2 PopSaveFileLabel"><br></label>
                <span id="ID_PopWeightConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopWeightCancel" class="PopCancel">取消</span>
            </div>-->
            <!--<div id="ID_PopSpeed" class="PopSaveFile">
                <input id="ID_PopSpeedInput" type="text" class="PopSaveFileInput" />
                <label for="ID_PopSpeedInput" class="PopSaveFileLabel1"><br>流速:</label>
                <label for="ID_PopSpeedInput" class="PopSaveFileLabel2"><br>千克/时</label>
                <span id="ID_PopSpeedConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopSpeedCancel" class="PopCancel">取消</span>
            </div>-->
            <!--<div id="ID_PopWeight" class="PopSaveFile">
                <input id="ID_PopWeightInput" type="text" class="PopSaveFileInput" />
                <label for="ID_PopWeightInput" class="PopSaveFileLabel1 PopSaveFileLabel"><br>名称:</label>
                <label for="ID_PopWeightInput" class="PopSaveFileLabel2 PopSaveFileLabel"><br></label>
                <span id="ID_PopWeightConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopWeightCancel" class="PopCancel">取消</span>
            </div>-->
            <!--这是反应釜、计量罐、水罐、传感器状态标签所显示的弹窗；-->
          <div id="ID_PopWeight" class="PopSaveFile">
                <form class="form-horizontal PopSaveFile2" >
                <div class="form-group">
                    <label for="ID_PopWeightInput" class="col-sm-4 control-label lable2">控件类型:</label>
                    <div class="col-sm-7" id="ID_Poptype" name="ID_Poptype">
                    
                    </div>
                  </div>
                    <div class="form-group">
                    <label for="ID_PopWeightInput" class="col-sm-4 control-label lable2">请选择单元数:</label>
                    <div class="col-sm-7">
                    <select class="form-control" id="MeterSelectM" name="MeterSelectM">
                   </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-4 control-label lable2">请填写序号:</label>
                    <div class="col-sm-7">
                    <input type="text" class="form-control" id="ID_PopNumInputM" placeholder="如：2">
                   </select>
                    </div>
                  </div>
                   <div class="form-group">
                      <label for="ID_PopWeightInput" class="col-sm-4 control-label lable2">请填写设备名:</label>
                      <div class="col-sm-7">
                      <input type="text" class="form-control" id="ID_PopRemarkInput" >
                      </div>
                  </div>
                 <span id="ID_PopWeightConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopWeightCancel" class="PopCancel">取消</span>
                </form>
            </div>
            <div id="ID_PopLine" class="PopSaveFile" style="height:180px">
                <form class="form-horizontal PopSaveFile2" >
                <div class="form-group">
                    <label for="ID_PopLineInput" class="col-sm-4 control-label lable2">控件类型:</label>
                    <div class="col-sm-7" id="ID_Poptype2" name="ID_Poptype2">   
                    </div>
                  </div>
                    <div class="form-group">
                    <label for="ID_PopLineInput" class="col-sm-4 control-label lable2">请选择单元数:</label>
                    <div class="col-sm-7">
                    <select class="form-control" id="MeterSelectL" name="MeterSelectL">
                   </select>
                    </div>
                  </div>
                 <span id="ID_PopLineConfirm" class="PopConfirm" style="top:70%">保存</span>
                <span id="ID_PopLineCancel" class="PopCancel" style="top:70%">取消</span>
                </form>
            </div>
            <!--这是传感器的弹窗-->
            <div id="ID_PopSensor" class="PopSaveFilesensor">
                <form class="form-horizontal PopSaveFile2" >
                <div class="form-group">
                    <label for="ID_PopLineInput" class="col-sm-4 control-label lable2">控件类型:</label>
                    <div class="col-sm-7" id="ID_Poptype3" name="ID_Poptype3">   
                    </div>
                  </div>
                    <div class="form-group">
                    <label for="MeterSelectS" class="col-sm-4 control-label lable2">请选择单元数:</label>
                    <div class="col-sm-7">
                    <select class="form-control" id="MeterSelectS" name="MeterSelectS">
                   </select>
                    </div>
                  </div>
                  <div class="form-group">
                      <label for="ID_PopNumInputS" class="col-sm-4 control-label lable2">请输入序号:</label>
                      <div class="col-sm-7">
                      <input type="text" class="form-control" id="ID_PopNumInputS" placeholder="如：2"></input>
                      </div>
                  </div>
                   <div class="form-group">
                      <label for="ID_PopDecimalInput" class="col-sm-4 control-label lable2">小数位数:</label>
                      <div class="col-sm-7">
                      <input type="text" class="form-control" id="ID_PopDecimalInput" placeholder="DecimalPlaces">
                      </div>
                  </div>
                   <div class="form-group">
                      <label for="DeviceInput" class="col-sm-4 control-label lable2">选择所在设备名:</label>
                      <div class="col-sm-7">
                          <select class="form-control" id="DeviceInput" name="DeviceInput">
                   </select>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="ID_PopMatterInput" class="col-sm-4 control-label lable2">物料名称:</label>
                      <div class="col-sm-7">
                      <input type="text" class="form-control" id="ID_PopMatterInput" placeholder="Matter">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="ID_PopTCtrlInfoInput" class="col-sm-4 control-label lable2">温度控制信息:</label>
                      <div class="col-sm-7" style="padding:0 0 0 15px ">
                      <input type="text" class="Teminput" id="ID_PopTCtrlInfoInput1"  style="width:40px;height:30px">
                      <span style="padding:0 2px 0 2px">,</span>
                      <input type="text" class="Teminput" id="ID_PopTCtrlInfoInput2"  style="width:40px;height:30px">
                      <span style="padding:0 2px 0 2px">,</span>
                      <input type="text" class="Teminput" id="ID_PopTCtrlInfoInput3"  style="width:40px;height:30px">
                      <span style="padding:0 2px 0 2px">,</span>
                      <input type="text" class="Teminput" id="ID_PopTCtrlInfoInput4" style="width:40px;height:30px">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="ID_PopTHAlarmInput" class="col-sm-4 control-label lable2">高温报警值:</label>
                      <div class="col-sm-7">
                      <input type="text" class="form-control" id="ID_PopTHAlarmInput" placeholder="格式如：600">
                      </div>
                  </div>
                 <span id="ID_PopSensorConfirm" class="PopConfirm" style="top:87%" >保存</span>
                <span id="ID_PopSensorCancel" class="PopCancel" style="top:87%" >取消</span>
                </form>
            </div>
            <!--这是高温报警标签的弹窗-->
            <div id="ID_PopAlarm" class="PopSaveFile">
                <form class="form-horizontal PopSaveFile2" >
                <div class="form-group">
                    <label  class="col-sm-3 control-label lable2">控件类型:</label>
                    <div class="col-sm-8" id="ID_Poptype4" name="ID_Poptype4">   
                    </div>
                  </div>
                    <div class="form-group">
                    <label for="MeterSelectA" class="col-sm-4 control-label lable2">请选择单元数:</label>
                    <div class="col-sm-7">
                     <select class="form-control" id="MeterSelectA" name="MeterSelectA">
                   </select>
                    </div>
                  </div>
                   <div class="form-group">
                      <label for="ID_PopAlarmsensorInput" class="col-sm-4 control-label lable2">请选择传感器</label>
                      <div class="col-sm-7">
                      <select class="form-control" id="AlarmsensorInput" name="AlarmsensorInput">
                   </select>
                      </div>
                  </div>
                 <span id="ID_PopAlarmConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopAlarmCancel" class="PopCancel">取消</span>
                </form>
            </div>
            <!--这是电机、阀门、滴加阀、泵（Switch）的弹窗-->
             <div id="ID_PopSwitch" class="PopSaveFilesensor" style="height:415px">
                <form class="form-horizontal PopSaveFile2" >
                <div class="form-group">
                    <label  class="col-sm-4 control-label lable2">控件类型:</label>
                    <div class="col-sm-8" id="ID_Poptype5" name="ID_Poptype5">   
                    </div>
                  </div>
                   <div class="form-group">
                    <label for="ID_PopSwitchPropertyInput" class="col-sm-4 control-label lable2">请选择单元数 :</label>
                    <div class="col-sm-7">
                    <select class="form-control" id="MeterSelectH" name="MeterSelectH">
                   </select>
                    </div>
                  </div>
                   <div class="form-group">
                    <label for="SwitchNumInput" class="col-sm-4 control-label lable2">请输入序号 :</label>
                    <div class="col-sm-7">
                     <input type="text" class="form-control" id="SwitchNumInput" placeholder="格式如：2">
                    </div>
                  </div>
                  <div class="form-group">
                      <label for="SwitchSensorName" class="col-sm-4 control-label lable2">选择关联传感器:</label>
                     <div class="col-sm-7">
                    <select class="form-control" id="SwitchSensorName" name="SwitchSensorName">
                   </select>
                    </div>
                  </div>
                  <div class="form-group">
                      <label for="ID_PopSwitchMatterInput" class="col-sm-4 control-label lable2">测量物料名称:</label>
                      <div class="col-sm-7">
                    <input type="text" class="form-control" id="ID_PopSwitchMatterInput" placeholder="格式如：水">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="ID_PopFeedbackdelay" class="col-sm-4 control-label lable2">反馈延时时间:</label>
                      <div class="col-sm-6">
                    <input type="text" class="form-control" id="ID_PopFeedbackdelay" placeholder="格式如：2" >
                      </div>
                      <div class="col-sm-1">
                    <span style="font-size:16px;margin-left:-15px">ms</span>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="SwitchSensorUsing" class="col-sm-6 control-label lable2">选择称重传感器(仅针对泵):</label>
                       <div class="col-sm-5">
                    <select class="form-control" id="SwitchSensorUsing" name="SwitchSensorUsing">
                   </select>
                    </div>
                  </div>
                 <span id="ID_PopSwitchConfirm" class="PopConfirm" style="top:87%">保存</span>
                <span id="ID_PopSwitchCancel" class="PopCancel" style="top:87%">取消</span>
                </form>
            </div>
          
            <div id="ID_PopDrop" class="PopSaveFile">
                <form class="form-horizontal PopSaveFile2" >
                 <div class="alert alert-success text-center Alertpart" id="AlertSuccess1" style="padding:5px;">
                     添加成功！ </div>
                <div class="form-group">
                    <label class="col-xs-4 control-label lable2">您选择的功能是:</label>
                    <div class="col-xs-3" id="ID_Poptype7" name="ID_Poptype7"> </div> 
                    <!--<div class="col-xs-2" style="margin-top:3px">
                    <button type="button" class="btn btn-xs btn-default" id="add1" name="add1" onclick=addClick(this)>
                   <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>添加
                   </button> 
                  </div>
                   <div class="col-xs-2" style="margin-top:3px">
                    <button type="button" class="btn btn-xs btn-default" id="del1" name="del1" >
                   <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>删除
                   </button> 
                  </div>-->
                  </div>
                    <div class="form-group col-xs-6" style="margin:-20px 0 0 0" >
                    <label  class="control-label lable2 col-xs-offset-3" style="margin-bottom:5px">计量罐名：</label>
                 <select class="form-control" id="MeterSelectD" name="MeterSelectD">
                   </select>
                    </div>
                  <div class="form-group col-xs-6 col-xs-offset-2" style="margin:-20px -30px 0 0" >
                    <label  class="control-label lable2 col-xs-offset-3" style="margin-bottom:5px">滴加阀：</label>
                   <select class="selectpicker form-control" id="AjustSelect" name="AjustSelect" multiple data-live-search="true">
                   </select>
                  </div>
                 <span id="ID_PopDropConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopDropCancel" class="PopCancel">取消</span>
                </form>
            </div>
            <!--加料的弹窗-->
            <div id="ID_Popjialiao" class="PopSaveFilefood">
                <form class="form-horizontal PopSaveFile2" >
                     <div class="alert alert-success text-center Alertpart" id="AlertSuccess" style="padding:5px;">
                     添加成功！ </div>
                <div class="form-group">
                    <label for="ID_PopLineInput" class="col-xs-4 control-label lable2">您选择的功能是:</label>
                    <div class="col-xs-3" id="ID_Poptype6" name="ID_Poptype6"> </div> 
                </div>
                <div class="form-group">
                    <label for="ID_PopLineInput" class="control-label lable2 col-xs-4">计量罐名：</label>
                    <div class="col-xs-7" >
                       <select class="form-control" id="MeterSelect" name="MeterSelect">
                       </select>
                    </div>
                </div>
                  <div class="form-group">
                    <label for="ID_PopLineInput" class="control-label lable2 col-xs-4">阀门：</label>
                    <div class="col-xs-7" >
                       <select class="selectpicker form-control" id="SwitchSelect" name="SwitchSelect" multiple data-live-search="true">
                       </select>
                   </div>
                 </div>
                 <div class="form-group">
                    <label for="ID_PopLineInput" class="control-label lable2 col-xs-4">加料最大值：</label>
                    <div class="col-xs-7" >
                       <input class="form-control" type="text" placeholder="请填入数字" id="max" name="max"></input>
                       </select>
                   </div>
                 </div>
                    
                 <span id="ID_PopjialiaoConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopjialiaoCancel" class="PopCancel">关闭</span>
                </form>
            </div>
            <!--出料的弹窗-->
            <div id="ID_Popoutp" class="PopSaveFile">
                <form class="form-horizontal PopSaveFile2" >
                 <div class="alert alert-success text-center Alertpart" id="AlertSuccess2" style="padding:5px;">
                     添加成功！ </div>
                <div class="form-group">
                    <label class="col-xs-4 control-label lable2">您选择的功能是:</label>
                    <div class="col-xs-3" id="ID_Poptype8" name="ID_Poptype8"> </div> 
                  </div>
                    <div class="form-group col-xs-6" style="margin:-20px 0 0 0" >
                    <label  class="control-label lable2 col-xs-offset-3" style="margin-bottom:5px">计量罐名：</label>
                 <select class="form-control" id="MeterSelectO" name="MeterSelectO">
                   </select>
                    </div>
                  <div class="form-group col-xs-6 col-xs-offset-2" style="margin:-20px -30px 0 0" >
                    <label  class="control-label lable2 col-xs-offset-3" style="margin-bottom:5px">阀门：</label>
                   <select class="selectpicker form-control" id="SwitchSelect1" name="SwitchSelect1" multiple data-live-search="true">
                   </select>
                  </div>
                 <span id="ID_PopoutpConfirm" class="PopConfirm">保存</span>
                <span id="ID_PopoutpCancel" class="PopCancel">取消</span>
                </form>
            </div>
            <!--过程温控和高温报警的弹窗-->
             <div id="ID_Poptemp" class="PopSaveFile">
                <form class="form-horizontal PopSaveFile2" >
                 <div class="alert alert-success text-center Alertpart" id="AlertSuccess3" style="padding:5px;">
                     添加成功！ </div>
                <div class="form-group">
                    <label class="col-xs-4 control-label lable2">您选择的功能是:</label>
                    <div class="col-xs-3" id="ID_Poptype9" name="ID_Poptype9"> </div> 
                  </div>
                    <div class="form-group">
                    <label  class="control-label lable2 col-xs-4">传感器：</label>
                    <div class="col-xs-7">
                     <select class="form-control" id="SensorSelect" name="SensorSelect">
                   </select>
                   </div>
                    </div>
                 <span id="ID_PoptempConfirm" class="PopConfirm">保存</span>
                <span id="ID_PoptempCancel" class="PopCancel">取消</span>
                </form>
            </div>
             <!-- 这是点击仿真打开文件保存的弹窗 -->
  <!-- <div id="ID_NOComplete" class="PopSaveFileno">
      <form class="form-horizontal PopSaveFile2" >
     <div class="col-xs-12" style="padding:5px">
         <img src="images/hardwork.gif" alt="Big Boat">
     </div>
      <div class="col-xs-12 text-center" style="padding:5px">
          <h4>程序员正快马加鞭地完善此功能！</h4>
       </div>
       <span id="ID_NOCompleteCancel" class="PopCancel">关闭</span>
       </form>
      </div>   -->
    </div>
</div>
<div class="box" id="box">
    	<div class="title">&nbsp;<span class="close"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></span></div>
        <div class="con">
        	<ul id="accordion" class="accordion" style="padding-left: 0px;">
		<li>
			<div class="link"><i class="fa fa-paint-brush"></i>请输入单元数<i class="fa fa-chevron-down"></i></div>
			<ul class="submenu" style="padding-left:0px;">
            <div class="container-fluid" style="border-bottom: 1px solid #CCC;padding:0px">
                <div class="row" style="margin:5px 0 5px 0;">
                  <div class="col-xs-8" name="unit_c" >
                  <input  type="number" min="1" max="20" id ="unit_count"  name="unit_count" class="form-control"  placeholder="请输入单元数">
                  </div>
                  <div class="col-xs-2">
                   <button type="submit" class="btn btn-default" id="create" name="create">提交</button>
                  </div>
                </div>
             </div>
			</ul>
		</li>

		<li>

			<div class="link"><i class="fa fa-mobile"></i>请选择单元功能<i class="fa fa-chevron-down"></i></div>
			<ul class="submenu text-center" style="padding:0 5px 0 5px" id="UnitFunction">
			</ul>
		</li>
	</ul>
        </div>
    </div>
     <div id="ID_TipRoot" class="TipRoot"></div>
  <!-- <div id="ID_LoadingContainer" class="LoadingContainer">
     <div class="LoadingLogo">CEAutoTool</div>
    <div id="ID_LoadingText" class="LoadingText">·</div> 
</div>   -->
 <!--move 是出发拖动的元素。

    closed 是关闭窗口的元素，自动到左上角隐藏。

    size 是右下角的按钮，可以改变窗口大小，不使用就不用写，数字代表按钮的宽高。

    css样式请自己添加。-->
   <script type="text/javascript">
		$(document).ready(function() {
            $('#box').bg_move({
				move:'.title',
				closed:'.close',
				size : 6
			});
        });
	</script> 
</body>
</html>
