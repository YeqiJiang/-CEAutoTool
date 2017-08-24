/// <reference path="jquery-2.2.1.min.js" />
/// <reference path="jquery.nicescroll.min.js" />
/// <reference path="html2canvas.min.js" />
$(function() {
     SatisfyUI();
     var project = getUrlParam('projectid');
     
     //alert(project);
     if(project!=null){
         $.ajax({
			 url: "../CEAutoTool16/include/alter.php?alterid="+project,
			 type: "post",
             cache: false,
            contentType: false,
            processData: false,
			success: function(result) {   
                var result=JSON.parse(result);//传过来的是字符串格式，转换为json对象
                 var workbench = result.workbench;
                shangweiji = JSON.parse(result.createdjson);//提取的json也是字符串格式，需要转化为json对象
                $('#ID_Workbench').append(workbench); 
                 var unit_count = shangweiji.unit.length;
                 UnitCount = unit_count;
                 for (var i=0;i<unit_count;i++){
         var unit_id = "u0"+(i+1);
         $('#UnitFunction').append("<li id="+unit_id+" onclick='unitfun(this)'>单元"+ (i+1) +"</li>");
         $('#'+unit_id).after(
             "<ul class='submenu' id="+unit_id+"ul><div class='checkbox'><label><input type='checkbox' id='"+unit_id +"_feed'  value='1' onclick='SelectFunction(this)'>定量加料</label></div><div class='checkbox'><label> <input type='checkbox' value='2' id='"+unit_id+"_drop' onclick='SelectFunction(this)'>定速滴加</label></div><div class='checkbox'><label><input type='checkbox' value='3' id='"+unit_id+"_outp' onclick='SelectFunction(this)' >定量出料</label></div> <div class='checkbox'><label><input type='checkbox' value='4' id='"+unit_id+"_temp' onclick='SelectFunction(this)'>过程温控</label></div><div class='checkbox'><label><input type='checkbox' value='5' id='"+unit_id+"_thal' onclick='SelectFunction(this)'> 高温报警</label> </div><div class='checkbox'><label><input type='checkbox' value='6' id='"+unit_id+"_reset' onclick='SelectFunction(this)'>复位</label></div><div class='checkbox'><label><input type='checkbox' value='7' id='"+unit_id+"_chk' onclick='SelectFunction(this)'>自检</label></div></ul>");
     }
     $('#unit_count').attr("disabled","ture");
     $('#create').attr("disabled","ture");
     $(Selectunit).each(function(index,data){
           UnitSelect(data);
     });      
			}
		});
     }
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}

	var accordion = new Accordion($('#accordion'), false);
});
var DocEle = {
    Root: null,
    RootContainer: null,
    StatePanel: null,
    SystemState: null,
    DetailContainer: null,
    TemplatePanel: null,
    TCAllOff: null,
    TCAllOn: null,
    TCSliderBottom: null,
    TCSliderTop: null,
    TCSliderAuto: null,
    TCSliderHand: null,
    WorkbenchPanel: null,
    Workbench: null,
    WorkbenchExpandUp: null,
    WorkbenchExpandDown: null,
    WorkbenchExpandLeft: null,
    WorkbenchExpandRight: null,
    WorkbenchShrinkUp: null,
    WorkbenchShrinkDown: null,
    WorkbenchShrinkLeft: null,
    WorkbenchShrinkRight: null,
    WorkbenchCornerLU: null,
    WorkbenchCornerRU: null,
    WorkbenchCornerLD: null,
    WorkbenchCornerRD: null,
    WorkbenchEdgeUp: null,
    WorkbenchEdgeDown: null,
    WorkbenchEdgeLeft: null,
    WorkbenchEdgeRight: null,
    RButtonMenu: null,
    RButtonMenuBKImage: null,
    RButtonMenuOption1: null,
    RButtonMenuOption2: null,
    RButtonMenuOption3: null,
    RButtonMenuOption4: null,
    RButtonMenuOption5: null,
    ProgressBar: null,
    LoadFile: null,
    SaveFile: null,
    ExportFile: null,
    UploadFileForm: null,
    UploadFileInput: null,
    PopRoot: null,
    PopMenuContainer: null,
    PopSaveFile: null,
    PopSaveFileInput: null,
    PopSaveFileConfirm: null,
    PopSaveFileCancel: null,
    PopExportFile: null,
    PopExportFileInput: null,
    PopExportFileConfirm: null,
    PopExportFileCancel: null,
    PopComment: null,
    PopCommentInput: null,
    PopCommentConfirm: null,
    PopCommentCancel: null,
    PopWeight: null,
    PopPropertyInput: null,
    PopWeightConfirm: null,
    PopWeightCancel: null,
    PopSpeed: null,
    PopSpeedInput: null,
    PopSpeedConfirm: null,
    PopSpeedCancel: null,
    TipRoot: null,
    PageFoot: null,
    LoadingContainer: null,
    LoadingText: null,
    NewAsset: null,
};
var DetailEle = {
    DetailID: null,
    DetailType: null,
    DetailPosition: null,
    DetailComment: null,
    DetailIChooseBox: null,
    DetailInterfaceList: null,
    DetailInterface: null,
    DetailWeight: null,
    DetailSpeed: null,
    DetailIDPanel: null,
    DetailTypePanel: null,
    DetailPositionPanel: null,
    DetailCommentPanel: null,
    DetailInterfacePanel: null,
    DetailWeightPanel: null,
    DetailSpeedPanel: null,
};
var GlobalParameters = {
    SystemState: 0, // 0.StandBy 1.PutNewObj 2.MovWBObj
    LastMouseX: 0,
    LastMouseY: 0,
    isAutoFolding: true,
    MovingWBObject: null,
    isMovingAlone: true,
    AdjustWBObject: null,
    SourceWireInterface: null,
    RBtnMenuObject: null,
    DefaultESD: 100, // Default Expand Shrink Distance.
    DefaultESDHalf: 50, // Default Expand Shrink Distance Half.
    DefaultPCD: 900, // Default PreConnect Distance.
};
var NowChosen = {
    isChosen: false,
    Handle: null,
    ClassName: "",
};
var shangweiji = {
        "project_name":"上位机",
        "unit":[]
    }; 
var TemplateList; // 0.计量罐 1.大储罐 2.反应釜 3.复配罐 4.预混罐 5.阀门 6.水管接头 7.水管 8.泵 9.电机10.传感器11.高温报警警示条
var TemplateListID = ["ID_CalTankTabUL", "ID_StoTankTabUL", "ID_ReactorTabUL", "ID_FuPeiTankTabUL",
    "ID_MixTankTabUL", "ID_ValveTabUL", "ID_ConvertTabUL", "ID_PipeTabUL", "ID_PumpTabUL", "ID_ElectTabUL","ID_SensorTabUL","ID_AlarmTabUL"];
var TemplateListHeight = [282, 678, 133, 133, 133, 252, 216, 115, 78, 133,310,190];//设置每个的宽度，后面两个是先给定的值
//var TemplateListSub; // 0.flag: 'true' for on, 'false' for off 1.Handle 2.Height
var AllInterface; // 0.AllInterfaceLine11Left 1.AllInterfaceLine11Right 2.AllInterfaceLine12Up 3.AllInterfaceLine12Down
var MovingInterface; // 0.I1 1.I2 2.I3 3.I4 4.I5 5.I6 6.I7
//var InterfaceSub; // 0.Handle 1.TargetHandle
var ICInfo; // 0.I1 1.I2 2.I3 3.I4 4.I5 5.I6 6.I7
//var ICInfoSub; // 0.isPreConnect 1.ID#Ix 2.Distance
var CRect; // 0.I1 1.I2 2.I3 3.I4 4.I5 5.I6 6.I7
// data-itype="InterfaceLine11Up/InterfaceLine11Down/InterfaceLine12Up/InterfaceLine12Down"
// data-iconnect="ID#INumber"
var WireCInfo; // 0.isPreConnect 1.TargetHandle 2.Distance
var Wire; // 0-4
var isLoading = true;
var loadingTimes = 1;
var submitcontroler=[];
var MeteringTank=[];//计量罐数组，用于以后选择
var Switch=[];//阀门数组
var Ajust=[];//滴加阀
var Sensor=[];//传感器
var UnitCount=null;//全局变量，用于记录单元数，便于弹窗对单元数的选择。
var Selectunit=["MeterSelectM","MeterSelectL","MeterSelectS","MeterSelectA","MeterSelectH"];
$(document).ready(function () {
    InitLoading();
    InitDocEle();
    InitDetailEle();
    InitInterfaceArray();
    InitTemplateList();
    InitNiceScroll();
    InitEvents();
    InitEleSettings();
    InitBrowserSettings();
});
$(window).load(function () {
    //var WindowWidth = parseInt($(window).width());
    //var WindowHeight = parseInt($(window).height());
    SatisfyUI();
    isLoading = false;
    $('.selectpicker').selectpicker({
                'selectedText': 'cat'
            });
   
});
// Initialize Loading
function InitLoading() {
    DocEle.LoadingContainer = $("#ID_LoadingContainer");
    DocEle.LoadingText = $("#ID_LoadingText");
    Loading();
}
// Initialize All Document Elements.
function InitDocEle() {
    DocEle.Root = $("#ID_Root");
    DocEle.RootContainer = $("#ID_RootContainer");
    DocEle.StatePanel = $("#ID_StatePanel");
    DocEle.SystemState = $("#ID_SystemState");
    DocEle.DetailContainer = $("#ID_DetailContainer");
    DocEle.TemplatePanel = $("#ID_TemplatePanel");
    DocEle.TCAllOff = $("#ID_TCAllOff");
    DocEle.TCAllOn = $("#ID_TCAllOn");
    DocEle.TCSliderBottom = $("#ID_TCSliderBottom");
    DocEle.TCSliderTop = $("#ID_TCSliderTop");
    DocEle.TCSliderAuto = $("#ID_TCSliderAuto");
    DocEle.TCSliderHand = $("#ID_TCSliderHand");
    DocEle.WorkbenchPanel = $("#ID_WorkbenchPanel");
    DocEle.Workbench = $("#ID_Workbench");
    DocEle.WorkbenchExpandUp = $("#ID_WorkbenchExpandUp");
    DocEle.WorkbenchExpandDown = $("#ID_WorkbenchExpandDown");
    DocEle.WorkbenchExpandLeft = $("#ID_WorkbenchExpandLeft");
    DocEle.WorkbenchExpandRight = $("#ID_WorkbenchExpandRight");
    DocEle.WorkbenchShrinkUp = $("#ID_WorkbenchShrinkUp");
    DocEle.WorkbenchShrinkDown = $("#ID_WorkbenchShrinkDown");
    DocEle.WorkbenchShrinkLeft = $("#ID_WorkbenchShrinkLeft");
    DocEle.WorkbenchShrinkRight = $("#ID_WorkbenchShrinkRight");
    DocEle.WorkbenchCornerLU = $("#ID_WorkbenchCornerLU");
    DocEle.WorkbenchCornerRU = $("#ID_WorkbenchCornerRU");
    DocEle.WorkbenchCornerLD = $("#ID_WorkbenchCornerLD");
    DocEle.WorkbenchCornerRD = $("#ID_WorkbenchCornerRD");
    DocEle.WorkbenchEdgeUp = $("#ID_WorkbenchEdgeUp");
    DocEle.WorkbenchEdgeDown = $("#ID_WorkbenchEdgeDown");
    DocEle.WorkbenchEdgeLeft = $("#ID_WorkbenchEdgeLeft");
    DocEle.WorkbenchEdgeRight = $("#ID_WorkbenchEdgeRight");
    DocEle.RButtonMenu = $("#ID_RButtonMenu");
    DocEle.RButtonMenuBKImage = $("#ID_RButtonMenuBKImage");
    DocEle.RButtonMenuOption1 = $("#ID_RButtonMenuOption1");
    DocEle.RButtonMenuOption2 = $("#ID_RButtonMenuOption2");
    DocEle.RButtonMenuOption3 = $("#ID_RButtonMenuOption3");
    DocEle.RButtonMenuOption4 = $("#ID_RButtonMenuOption4");
    DocEle.RButtonMenuOption5 = $("#ID_RButtonMenuOption5");
    DocEle.ProgressBar = $("#ID_ProgressBar");
    DocEle.LoadFile = $("#ID_LoadFile");
    DocEle.SaveFile = $("#ID_SaveFile");
    DocEle.PlayMode = $("#ID_PlayMode");
    DocEle.ExportFile = $("#ID_ExportFile");
    DocEle.UploadFileForm = $("#ID_UploadFileForm");
    DocEle.UploadFileInput = $("#ID_UploadFileInput");
    DocEle.PopRoot = $("#ID_PopRoot");
    DocEle.PopMenuContainer = $("#ID_PopMenuContainer");
    DocEle.PopSaveFile = $("#ID_PopSaveFile");
    DocEle.PopSaveFileInput = $("#ID_PopSaveFileInput");
    DocEle.PopSaveFileConfirm = $("#ID_PopSaveFileConfirm");
    DocEle.PopSaveFileCancel = $("#ID_PopSaveFileCancel");
    DocEle.PopExportFile = $("#ID_PopExportFile");
    DocEle.PopExportFileInput = $("#ID_PopExportFileInput");
    DocEle.PopExportFileConfirm = $("#ID_PopExportFileConfirm");
    DocEle.create = $("#create");
    DocEle.PopExportFileCancel = $("#ID_PopExportFileCancel");
    DocEle.PopComment = $("#ID_PopComment");
    DocEle.PopCommentInput = $("#ID_PopCommentInput");
    DocEle.PopCommentConfirm = $("#ID_PopCommentConfirm");
    DocEle.PopCommentCancel = $("#ID_PopCommentCancel");
    //反应釜 计量罐 水罐 传感器状态标签 用的是id是ID_PopWeight的输入弹窗。
    DocEle.PopWeight = $("#ID_PopWeight");
    DocEle.PopSelectInputM = $("#MeterSelectM");
    DocEle.PopNumInputM = $("#ID_PopNumInputM");
    DocEle.PopRemarkInput = $("#ID_PopRemarkInput");
    DocEle.PopWeightConfirm = $("#ID_PopWeightConfirm");
    DocEle.PopWeightCancel = $("#ID_PopWeightCancel");
   //管道接口和管道的弹出窗
    DocEle.PopLine = $("#ID_PopLine");
    DocEle.PopLinePropertyInput = $("#ID_PopLinePropertyInput");
    DocEle.PopLineRemarkInput = $("#ID_PopLineRemarkInput");
    DocEle.PopLineConfirm = $("#ID_PopLineConfirm");
    DocEle.PopLineCancel = $("#ID_PopLineCancel");
   //传感器的弹出窗
    DocEle.PopSensor = $("#ID_PopSensor");
    //DocEle.PopSensorPropertyInput = $("#ID_PopSensorPropertyInput");
    DocEle.PopDecimalInput = $("#ID_PopDecimalInput");
   // DocEle.PopDeviceInput = $("#ID_PopDeviceInput");
    DocEle.PopMatterInput = $("#ID_PopMatterInput");
    DocEle.PopTHAlarmInput = $("#ID_PopTHAlarmInput");
    DocEle.PopSensorConfirm = $("#ID_PopSensorConfirm");
    DocEle.PopSensorCancel = $("#ID_PopSensorCancel");
   //高温报警标签的弹出窗
    DocEle.PopAlarm = $("#ID_PopAlarm");
   // DocEle.PopAlarmPropertyInput = $("#ID_PopAlarmPropertyInput");
   // DocEle.PopAlarmsensorInput = $("#ID_PopAlarmsensorInput");
    DocEle.PopAlarmConfirm = $("#ID_PopAlarmConfirm");
    DocEle.PopAlarmCancel = $("#ID_PopAlarmCancel");
  //电机、阀门、滴加阀、泵（Switch）的弹出窗
    DocEle.PopSwitch = $("#ID_PopSwitch");
    // DocEle.PopSwitchPropertyInput = $("#ID_PopSwitchPropertyInput");
    // DocEle.PopSwitchSensorNameInput = $("#ID_PopSwitchSensorNameInput");
    // DocEle.PopSwitchSensorUsingInput = $("#ID_PopSwitchSensorUsingInput");
    DocEle.PopSwitchMatterInput=$("#ID_PopSwitchMatterInput");
    DocEle.PopFeedbackdelay=$("#ID_PopFeedbackdelay");
    DocEle.PopSwitchConfirm = $("#ID_PopSwitchConfirm");
    DocEle.PopSwitchCancel = $("#ID_PopSwitchCancel");
//加料的弹窗
   DocEle.Popjialiao = $("#ID_Popjialiao");
   DocEle.PopjialiaoConfirm = $("#ID_PopjialiaoConfirm");
   DocEle.PopjialiaoCancel = $("#ID_PopjialiaoCancel");
//滴加的弹窗
  DocEle.PopDrop = $("#ID_PopDrop");
   DocEle.PopDropConfirm = $("#ID_PopDropConfirm");
   DocEle.PopDropCancel = $("#ID_PopDropCancel");
//出料的弹窗
   DocEle.Popoutp = $("#ID_Popoutp");
   DocEle.PopoutpConfirm = $("#ID_PopoutpConfirm");
   DocEle.PopoutpCancel = $("#ID_PopoutpCancel");
//过程温控和高温报警的弹窗
   DocEle.Poptemp = $("#ID_Poptemp");
   DocEle.PoptempConfirm = $("#ID_PoptempConfirm");
   DocEle.PoptempCancel = $("#ID_PoptempCancel");
   //没有完成的功能的弹窗
   DocEle.NOComplete = $("#ID_NOComplete");
   DocEle.NOCompleteCancel = $("#ID_NOCompleteCancel");
    DocEle.TipRoot = $("#ID_TipRoot");
    DocEle.PageFoot = $("#ID_PageFoot");
    DocEle.PopSpeed = $("#ID_PopSpeed");
    DocEle.PopSpeedInput = $("#ID_PopSpeedInput");
    DocEle.PopSpeedConfirm = $("#ID_PopSpeedConfirm");
    DocEle.PopSpeedCancel = $("#ID_PopSpeedCancel");
    DocEle.TipRoot = $("#ID_TipRoot");
    DocEle.PageFoot = $("#ID_PageFoot");
}
// Initialize All DetailPanel Elements.
function InitDetailEle() {
    DetailEle.DetailID = $("#ID_DetailID");
    DetailEle.DetailType = $("#ID_DetailType");
    DetailEle.DetailPosition = $("#ID_DetailPosition");
    DetailEle.DetailComment = $("#ID_DetailComment");
    DetailEle.DetailIChooseBox = $("#ID_DetailIChooseBox");
    DetailEle.DetailInterfaceList = $("#ID_DetailInterfaceList");
    DetailEle.DetailInterface = $("#ID_DetailInterface");
    DetailEle.DetailWeight = $("#ID_DetailWeight");
    DetailEle.DetailSpeed = $("#ID_DetailSpeed");
    DetailEle.DetailIDPanel = $("#ID_DetailIDPanel");
    DetailEle.DetailTypePanel = $("#ID_DetailTypePanel");
    DetailEle.DetailPositionPanel = $("#ID_DetailPositionPanel");
    DetailEle.DetailCommentPanel = $("#ID_DetailCommentPanel");
    DetailEle.DetailInterfacePanel = $("#ID_DetailInterfacePanel");
    DetailEle.DetailWeightPanel = $("#ID_DetailWeightPanel");
    DetailEle.DetailSpeedPanel = $("#ID_DetailSpeedPanel");
}
// Initialize All Interface Array.
function InitInterfaceArray() {
    AllInterface = new Array();
    AllInterface[0] = new Array();
    AllInterface[1] = new Array();
    AllInterface[2] = new Array();
    AllInterface[3] = new Array();
    MovingInterface = new Array();
    GlobalParameters.MovingWBObject = new Array();
    ICInfo = new Array();
    CRect = new Array();
    for (var i = 0; i < 7; i++) {
        CRect[i] = $("#ID_CRect" + (i + 1));
    }
    WireCInfo = new Array();
    Wire = new Array();
    for (var i = 0; i < 5; i++) {
        Wire[i] = $("#ID_Wire" + (i + 1));
    }
}
// Initialize Template List.
function InitTemplateList() {
    TemplateList = new Array();
    for (var i = 0; i < 12; i++) {
        var TemplateListSub = new Array();
        TemplateListSub[0] = false;
        TemplateListSub[1] = $("#" + TemplateListID[i]);
        TemplateListSub[2] = TemplateListHeight[i];
        TemplateList.push(TemplateListSub);
    }
}
// Initialize NiceScroll Settings.
function InitNiceScroll() {
    DocEle.TemplatePanel.niceScroll({
        cursorcolor: "#FFFFFF",
        cursoropacitymin: 0,
        cursoropacitymax: 0.5,
        cursorwidth: "7px",
        cursorborder: "0px",
        cursorborderradius: "5px",
        autohidemode: "leave",
        smoothscroll: true,
        hidecursordelay: 700,
        mousescrollstep: 80
    });
    DocEle.WorkbenchPanel.niceScroll({
        cursorcolor: "#FFFFFF",
        cursoropacitymin: 0,
        cursoropacitymax: 0.5,
        cursorwidth: "7px",
        cursorborder: "0px",
        cursorborderradius: "5px",
        autohidemode: "leave",
        smoothscroll: true,
        hidecursordelay: 700
    });
}
// Initialize Events.
function InitEvents() {
    $(document).mousedown(function (event) { DocumentMouseDown(event); });
    $(document).mouseup(function (event) { DocumentMouseUp(event); });
    $(document).mousemove(function (event) { DocumentMouseMove(event); });
    $(document).click(function (event) { DocumentMouseClick(event); });
    $(document).bind("contextmenu", function () { return false; });

    $(window).blur(WindowBlur);
    $(window).focus(WindowFocus);
    $(window).resize(WindowResize);

    DocEle.LoadFile.click(LoadFileClick);
    DocEle.SaveFile.click(SaveFileClick);
     DocEle.PlayMode.click(PlayModeClick);
    DocEle.ExportFile.click(ExportFileClick);
    DocEle.UploadFileInput.change(UpLoadFileInputChange);

    DocEle.PopSaveFileConfirm.click(PopSaveFileConfirmClick);
    DocEle.PopSaveFileCancel.click(PopSaveFileCancelClick);
    DocEle.PopExportFileConfirm.click(PopExportFileConfirmClick);
    DocEle.create.click(createClick);
    DocEle.PopExportFileCancel.click(PopExportFileCancelClick);
    DocEle.PopCommentConfirm.click(PopCommentConfirmClick);
    DocEle.PopCommentCancel.click(PopCommentCancelClick);
    //反应釜 计量罐 水罐 传感器状态标签弹出窗的按钮。
    DocEle.PopWeightConfirm.click(PopWeightConfirmClick);
    DocEle.PopWeightCancel.click(PopWeightCancelClick);
    //管道接口 管道的弹出窗按钮
    DocEle.PopLineConfirm.click(PopLineConfirmClick);
    DocEle.PopLineCancel.click(PopLineCancelClick);
    //传感器的弹出窗按钮
    DocEle.PopSensorConfirm.click(PopSensorConfirmClick);
    DocEle.PopSensorCancel.click(PopSensorCancelClick);
    //高温报警标签的弹出窗按钮
    DocEle.PopAlarmConfirm.click(PopAlarmConfirmClick);
    DocEle.PopAlarmCancel.click(PopAlarmCancelClick);
    //之前speed的按钮，后来没用了，现在还留着
    DocEle.PopSpeedConfirm.click(PopSpeedConfirmClick);
    DocEle.PopSpeedCancel.click(PopSpeedCancelClick);
    //电机、阀门、滴加阀、泵（Switch）的弹窗按钮
    DocEle.PopSwitchConfirm.click(PopSwitchConfirmClick);
    DocEle.PopSwitchCancel.click(PopSwitchCancelClick);
    DetailEle.DetailIChooseBox.click(DetailIChooseBoxClick);
   //加料的弹窗
   DocEle.PopjialiaoCancel.click(PopjialiaoCancelClick);
   DocEle.PopjialiaoConfirm.click(PopjialiaoConfirmClick);
   //滴加的弹窗
    DocEle.PopDropCancel.click(PopDropCancelClick);
    DocEle.PopDropConfirm.click(PopDropConfirmClick);
    //出料的弹窗
    DocEle.PopoutpCancel.click(PopoutpCancelClick);
    DocEle.PopoutpConfirm.click(PopoutpConfirmClick);
    //过程温控和高温报警的弹唱
    DocEle.PoptempCancel.click(PoptempCancelClick);
    DocEle.PoptempConfirm.click(PoptempConfirmClick);
    DocEle.NOCompleteCancel.click(NOCompleteCancelClick);
    DocEle.TCAllOff.click(ShrinkAllTemplateList);
    DocEle.TCAllOn.click(ExpandAllTemplateList);
    DocEle.TCSliderBottom.click(AutoFoldingChaging);
    DocEle.TCSliderTop.click(AutoFoldingChaging);
    DocEle.TCSliderAuto.click(AutoFoldingChaging);
    DocEle.TCSliderHand.click(AutoFoldingChaging);

    DocEle.WorkbenchExpandUp.click(WorkbenchExpandUpClick);
    DocEle.WorkbenchExpandDown.click(WorkbenchExpandDownClick);
    DocEle.WorkbenchExpandLeft.click(WorkbenchExpandLeftClick);
    DocEle.WorkbenchExpandRight.click(WorkbenchExpandRightClick);
    DocEle.WorkbenchShrinkUp.click(WorkbenchShrinkUpClick);
    DocEle.WorkbenchShrinkDown.click(WorkbenchShrinkDownClick);
    DocEle.WorkbenchShrinkLeft.click(WorkbenchShrinkLeftClick);
    DocEle.WorkbenchShrinkRight.click(WorkbenchShrinkRightClick);

    DocEle.RButtonMenuOption1.click(RButtonMenuOption1Click);
    DocEle.RButtonMenuOption2.click(RButtonMenuOption2Click);
    DocEle.RButtonMenuOption3.click(RButtonMenuOption3Click);
    DocEle.RButtonMenuOption4.click(RButtonMenuOption4Click);
    DocEle.RButtonMenuOption5.click(RButtonMenuOption5Click);
}
// Initialize Element Settings.
function InitEleSettings() {

}
// Initialize Special Browser Settings.
function InitBrowserSettings() {
    if (/msie/.test(navigator.userAgent.toLowerCase())) { // Identify browser for IE9-IE10.
        document.onselectstart = function () { return false; };
    } else if (!!window.ActiveXObject || "ActiveXObject" in window) { // Identify browser for IE11.
        document.onselectstart = function () { return false; };
    }
}

// Global Mouse Actions.
function DocumentMouseDown(event) {
    var e = event || window.event;
    var Object = $(e.target);
    var Type = Object.data("type");
    switch(e.button){//检测鼠标事件
        case 0:
            // every time mouse L click, close RMenu if needs.
            if (DocEle.RButtonMenu.is(":visible")) {
                if (Type != "RButtonMenu" && Type != "RButtonMenuOption") {
                    ShowOrHide(false, DocEle.RButtonMenu);
                }
            }
            // every time mouse L click, clear now chosen if needs.
            if (NowChosen.isChosen) {
                if (Type == "Workbench") {
                    ClearNowChosen();
                }
                if (Type == "WorkbenchObject") {
                    if (NowChosen.Handle.attr("id") != Object.attr("id")) {
                        ClearNowChosen();
                    }
                }
            }
            // take actions depending on data-type.
            switch (Type) {
                case "Template":
                if(shangweiji.unit.length==0){
                ShowTip("请您先填写单元数！");
                return;
                 }
                submitcontroler.name=Object.data("name");
                submitcontroler.width=Object.data("imgw");
                submitcontroler.height=Object.data("imgh");
                //submitcontroler.left=Object.position().left;
                //submitcontroler.top= Object.position().top;//position以up为准
                submitcontroler.linewidth=Object.css("width").slice(0,-2);
                submitcontroler.lineheight=Object.css("height").slice(0,-2);
                submitcontroler.mathid=Object.attr("id");
                    CreateWorkbenchObject(Object);
                    ClearNowChosen();
                    SetNowChosen(DocEle.NewAsset, GetFormalType(DocEle.NewAsset.data("name")) + "C");
                    SetSystemSate(1);
                    break;
                case "WorkbenchObject":
                //alert(Object.attr("id"));
                submitcontroler.name=Object.data("name");
                submitcontroler.width=Object.data("imgw");
                submitcontroler.height=Object.data("imgh");
                submitcontroler.left=Object.position().left;
                submitcontroler.top= Object.position().top;
                submitcontroler.linewidth=Object.css("width").slice(0,-2);
                submitcontroler.lineheight=Object.css("height").slice(0,-2);
                submitcontroler.mathid=Object.attr("id");
                    GlobalParameters.isMovingAlone = true;
                    Object.children().filter("div[data-type='Interface']").each(function () {
                        var Interface = $(this);
                        var IConnect = Interface.attr("data-iconnect");
                        if (IConnect != "") {
                            var IDArray = IConnect.split("#");
                            IsConnectAObject(IDArray[0], Object.attr("id"));
                        }
                    });
                    if (GlobalParameters.isMovingAlone) {
                        SatisfyMovingAlone(Object.attr("id"), "");
                        SetSystemSate(2);
                    } else {
                        GlobalParameters.AdjustWBObject = Object;
                        SetSystemSate(3);
                    }
                    if (!NowChosen.isChosen) {
                        SetNowChosen(Object, GetFormalType(Object.data("name")) + "C");
                    }
                    break;
                case "Interface":
                    if (!IsPipe(Object.parent().data("name"))) {
                        if (Object.attr("data-iconnect") == "") {
                            GlobalParameters.SourceWireInterface = Object;
                            AddOrRemoveClass(true, GlobalParameters.SourceWireInterface, "IPreConnect");
                            //var WireCInfo; // 0.isPreConnect 1.TargetHandle 2.Distance
                            WireCInfo[0] = false;
                            WireCInfo[1] = null;
                            WireCInfo[2] = 9999;
                            SetSystemSate(4);
                        }
                    }
                    break;
                default: break;
            }
            break;
        case 1:
            break;
        case 2:
            // show RButtonMenu if it's WorkbenchObject.
            if (Type == "WorkbenchObject") {
                GlobalParameters.RBtnMenuObject = $("#" + Object.attr("id"));
                // if(event.keyCode == 46){当按删除键的时候删除，这个没有实现哎
                //     alert("1");
                //   RButtonMenuOption4Click();
                // }
                html2canvas(DocEle.Workbench, {
                    allowTaint: true,
                    taintTest: false,
                    onrendered: function (canvas) {
                        canvas.id = "ID_RButtonMenuCanvas";
                        var dataUrl = canvas.toDataURL();
                        DocEle.RButtonMenu.css({
                            "left": parseInt(GlobalParameters.LastMouseX - DocEle.Workbench.offset().left) + "px",
                            "top": parseInt(GlobalParameters.LastMouseY - DocEle.Workbench.offset().top) + "px"
                        });
                        DocEle.RButtonMenuBKImage.attr("src", dataUrl);
                        DocEle.RButtonMenuBKImage.css({
                            "left": "-" + parseInt(GlobalParameters.LastMouseX - DocEle.Workbench.offset().left) + "px",
                            "top": "-" + parseInt(GlobalParameters.LastMouseY - DocEle.Workbench.offset().top) + "px"
                        });
                        ShowOrHide(true, DocEle.RButtonMenu);
                    }
                });
            }
            break;
        default: break;
    }
}
function DocumentMouseUp(event) {
    var e = event || window.event;
    switch (GlobalParameters.SystemState) {
        case 1:
            var isNAinWB = IsInDIVByPos(DocEle.NewAsset, DocEle.Workbench);
            if (isNAinWB) {
                DocEle.NewAsset.appendTo(DocEle.Workbench);
                DocEle.NewAsset.css({
                    "left": parseInt(GlobalParameters.LastMouseX - DocEle.Workbench.offset().left - DocEle.NewAsset.width() / 2) + "px",
                    "top": parseInt(GlobalParameters.LastMouseY - DocEle.Workbench.offset().top - DocEle.NewAsset.height() / 2) + "px",
                });
                var Name = DocEle.NewAsset.data("name");
                // ID: type + random 3 numbers
                var newID = Name + parseInt(Math.random() * 9) + parseInt(Math.random() * 9) + parseInt(Math.random() * 9);
                var isNewID = true;
                while (isNewID) {
                    if ($("#" + newID).length > 0) {
                        newID = Name + parseInt(Math.random() * 9) + parseInt(Math.random() * 9) + parseInt(Math.random() * 9);
                    } else {
                        isNewID = false;
                    }
                }
                submitcontroler.left = parseInt(GlobalParameters.LastMouseX - DocEle.Workbench.offset().left - DocEle.NewAsset.width() / 2);
                submitcontroler.top = parseInt(GlobalParameters.LastMouseY - DocEle.Workbench.offset().top - DocEle.NewAsset.height() / 2);
                DocEle.NewAsset.attr("data-type", "WorkbenchObject");
                DocEle.NewAsset.attr("id", newID);
                var ChosenInterface = {
                    IsChosen: false,
                    Distance: 0,
                    SHandle: null,
                    DHandle: null,
                }
                for (var i = 0; i < MovingInterface.length; i++) {
                    if (ICInfo[i][0]) {
                        if (!ChosenInterface.IsChosen) {
                            ChosenInterface.Distance = ICInfo[i][2];
                            ChosenInterface.SHandle = MovingInterface[i][0];
                            ChosenInterface.DHandle = ICInfo[i][1];
                            ChosenInterface.IsChosen = true;
                        } else {
                            if (ICInfo[i][2] < ChosenInterface.Distance) {
                                ChosenInterface.Distance = ICInfo[i][2];
                                ChosenInterface.SHandle = MovingInterface[i][0];
                                ChosenInterface.DHandle = ICInfo[i][1];
                            }
                        }
                    }
                }
                for (var i = 0; i < MovingInterface.length; i++) {
                    var ITypeIndex = SetInterface_GBTITI(MovingInterface[i][0].data("itype"));
                    var ITypeIndex1 = SetInterface_GMITI(MovingInterface[i][0].data("itype"));
                    if (ICInfo[i][0]) {
                        var TIArray; // Target Interface Array.
                        for (var j = 0; j < AllInterface[ITypeIndex1].length; j++) {
                            if (IsSameInterface(AllInterface[ITypeIndex1][j][0], ICInfo[i][1])) {
                                TIArray = AllInterface[ITypeIndex1][j];
                            }
                        }
                        AddOrRemoveClass(false, TIArray[0], "IPreConnect");
                        AddOrRemoveClass(false, MovingInterface[i][0], "IPreConnect");
                        ShowOrHide(false, CRect[i]);
                        if (MovingInterface[i][0] == ChosenInterface.SHandle) {
                            MovingInterface[i][1] = ICInfo[i][1]; // set source interface binding.
                            TIArray[1] = MovingInterface[i][0]; // set target interface binding.
                            MovingInterface[i][0].attr("data-iconnect", TIArray[0].parent().attr("id") + "#" + TIArray[0].data("inumber"));
                            TIArray[0].attr("data-iconnect", MovingInterface[i][0].parent().attr("id") + "#" + MovingInterface[i][0].data("inumber"));
                            AddOrRemoveClass(true, TIArray[0], "IConnected");
                            AddOrRemoveClass(true, MovingInterface[i][0], "IConnected");
                            // move object to satisfy interfaces.
                            var Left = TIArray[0].offset().left - MovingInterface[i][0].position().left - DocEle.Workbench.offset().left;
                            var Top = TIArray[0].offset().top - MovingInterface[i][0].position().top - DocEle.Workbench.offset().top;
                            MovingInterface[i][0].parent().animate({
                                left: parseInt(Left) + "px",
                                top: parseInt(Top) + "px",
                            }, 200);
                        }
                    }
                    AllInterface[ITypeIndex].push(MovingInterface[i]);
                }
                ClearDetailInterfaceList();
                SetDetailPanel(DocEle.NewAsset);
            } else {
                DocEle.NewAsset.remove();
                DocEle.NewAsset = null;
                ClearNowChosen();
                ShowTip("位置错误！未放置新对象!");
                //ShowTip("位置错误！未放置新对象！");
            }
            // clear MovingInterface array.
            MovingInterface = [];
            ICInfo = [];
            SetSystemSate(0);
            break;
        case 2:
            var ChosenInterface = {
                IsChosen: false,
                Distance: 0,
                SHandle: null,
                DHandle: null,
            }
            for (var i = 0; i < MovingInterface.length; i++) {
                if (ICInfo[i][0]) {
                    if (!ChosenInterface.IsChosen) {
                        ChosenInterface.Distance = ICInfo[i][2];
                        ChosenInterface.SHandle = MovingInterface[i][0];
                        ChosenInterface.DHandle = ICInfo[i][1];
                        ChosenInterface.IsChosen = true;
                    } else {
                        if (ICInfo[i][2] < ChosenInterface.Distance) {
                            ChosenInterface.Distance = ICInfo[i][2];
                            ChosenInterface.SHandle = MovingInterface[i][0];
                            ChosenInterface.DHandle = ICInfo[i][1];
                        }
                    }
                }
            }
            for (var i = 0; i < MovingInterface.length; i++) {
                var ITypeIndex = SetInterface_GBTITI(MovingInterface[i][0].data("itype"));
                var ITypeIndex1 = SetInterface_GMITI(MovingInterface[i][0].data("itype"));
                if (ICInfo[i][0]) {
                    var TIArray; // Target Interface Array.
                    for (var j = 0; j < AllInterface[ITypeIndex1].length; j++) {
                        if (AllInterface[ITypeIndex1][j][0] == ICInfo[i][1]) {
                            TIArray = AllInterface[ITypeIndex1][j];
                        }
                    }
                    AddOrRemoveClass(false, TIArray[0], "IPreConnect");
                    AddOrRemoveClass(false, MovingInterface[i][0], "IPreConnect");
                    ShowOrHide(false, CRect[i]);
                    if (MovingInterface[i][0] == ChosenInterface.SHandle) {
                        // set source interface binding.
                        for (var k = 0; k < AllInterface[ITypeIndex].length; k++) {
                            if (IsSameInterface(AllInterface[ITypeIndex][k][0], MovingInterface[i][0])) {
                                AllInterface[ITypeIndex][k][1] = ICInfo[i][1];
                            }
                        }
                        TIArray[1] = MovingInterface[i][0]; // set target interface binding.
                        MovingInterface[i][0].attr("data-iconnect", TIArray[0].parent().attr("id") + "#" + TIArray[0].data("inumber"));
                        TIArray[0].attr("data-iconnect", MovingInterface[i][0].parent().attr("id") + "#" + MovingInterface[i][0].data("inumber"));
                        AddOrRemoveClass(true, TIArray[0], "IConnected");
                        AddOrRemoveClass(true, MovingInterface[i][0], "IConnected");
                        // move object to satisfy interfaces.
                        var Left = TIArray[0].offset().left - MovingInterface[i][0].position().left - DocEle.Workbench.offset().left;
                        var Top = TIArray[0].offset().top - MovingInterface[i][0].position().top - DocEle.Workbench.offset().top;
                        var XLeft = Left - MovingInterface[i][0].parent().position().left;
                        var YTop = Top - MovingInterface[i][0].parent().position().top;
                        var XMark;
                        var YMark;
                        if (XLeft >= 0) {
                            XMark = "+=";
                        } else {
                            XMark = "-=";
                        }
                        if (YTop >= 0) {
                            YMark = "+=";
                        } else {
                            YMark = "-=";
                        }
                        for (var i = 0; i < GlobalParameters.MovingWBObject.length; i++) {
                            GlobalParameters.MovingWBObject[i].animate({
                                "left": XMark + Math.abs(XLeft) + "px",
                                "top": YMark + Math.abs(YTop) + "px",
                            }, 200);
                        }
                    }
                }
            }
            // clear MovingInterface array.
            GlobalParameters.MovingWBObject = [];
            MovingInterface = [];
            ICInfo = [];
            SetSystemSate(0);
            break;
        case 3:
            SetSystemSate(0);
            break;
        case 4:
            AddOrRemoveClass(false, GlobalParameters.SourceWireInterface, "IPreConnect");
            for (var i = 0; i < Wire.length; i++) {
                ShowOrHide(false, Wire[i]);
            }
            ShowOrHide(false, $("#ID_Point"));
            if (WireCInfo[0]) {
                ShowOrHide(false, CRect[0]);
                AddOrRemoveClass(false, WireCInfo[1], "IPreConnect");
                // check connection feasibility.
                var Feasibility = CheckConnection();
                if(Feasibility) {
                    // auto create connection.
                    AutoCreateConnection();
                } else {
                    //ShowTip("接口不符或位置不够!");
                    ShowTip("接口不符或位置不够!");//alert可以，showtip不可以了
                }
            }
            SetSystemSate(0);
            break;
        default: break;
    }
}
function DocumentMouseMove(event) {
    var e = event || window.event;
    switch (GlobalParameters.SystemState) {
        case 1:
            DocMMSSCase1(e);
            break;
        case 2:
            DocMMSSCase2(e);
            break;
        case 3:
            DocMMSSCase3(e);
            break;
        case 4:
            DocMMSSCase4(e);
            break;
        default: break;
    }
    GlobalParameters.LastMouseX = parseInt(e.pageX);
    GlobalParameters.LastMouseY = parseInt(e.pageY);
}
function DocumentMouseClick(event){
    var e = event || window.event;
}

// Window Events.
function WindowBlur() {
    switch (GlobalParameters.SystemState) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        default: break;
    }
}
function WindowFocus() {

}
function WindowResize() {
    SatisfyUI();
}

// Shrink All Template List.
function ShrinkAllTemplateList() {
    for (var i = 0; i < TemplateList.length; i++) {
        if (TemplateList[i][0]) {
            ShowHideTemplateUL(TemplateList[i][1], false, TemplateList[i][2]);
            TemplateList[i][0] = false;
        }
    }
}
// Expand All Template List.
function ExpandAllTemplateList() {
    for (var i = 0; i < TemplateList.length; i++) {
        if (!TemplateList[i][0]) {
            ShowHideTemplateUL(TemplateList[i][1], true, TemplateList[i][2]);
            TemplateList[i][0] = true;
        }
    }
}
// Satisfy Auto Folding Changing.
function AutoFoldingChaging() {
    if (GlobalParameters.isAutoFolding) {
        DocEle.TCSliderTop.animate({
            top: "29px",
        }, 200);
        AddOrRemoveClass(false, DocEle.TCSliderAuto, "TCSliderChosen");
        AddOrRemoveClass(true, DocEle.TCSliderAuto, "TCSliderNChosen");
        AddOrRemoveClass(false, DocEle.TCSliderHand, "TCSliderNChosen");
        AddOrRemoveClass(true, DocEle.TCSliderHand, "TCSliderChosen");
        GlobalParameters.isAutoFolding = false;
    } else {
        DocEle.TCSliderTop.animate({
            top: "9px",
        }, 200);
        AddOrRemoveClass(false, DocEle.TCSliderHand, "TCSliderChosen");
        AddOrRemoveClass(true, DocEle.TCSliderHand, "TCSliderNChosen");
        AddOrRemoveClass(false, DocEle.TCSliderAuto, "TCSliderNChosen");
        AddOrRemoveClass(true, DocEle.TCSliderAuto, "TCSliderChosen");
        GlobalParameters.isAutoFolding = true;
    }
}
// TemplatePanel Tab Options.
//完成折叠，左侧的特征分别是0，1，2，..9，10,11。
function TemplateListTabClick(TabIndex) {
    if (TemplateList[TabIndex][0]) {
        ShowHideTemplateUL(TemplateList[TabIndex][1], false, TemplateList[TabIndex][2]);
        TemplateList[TabIndex][0] = false;
    } else {
        if (GlobalParameters.isAutoFolding) {
            for (var i = 0; i < TemplateList.length; i++) {
                if (i != TabIndex) {
                    if (TemplateList[i][0]) {
                        ShowHideTemplateUL(TemplateList[i][1], false, TemplateList[i][2]);
                        TemplateList[i][0] = false;
                    }
                }
            }
        }
        ShowHideTemplateUL(TemplateList[TabIndex][1], true, TemplateList[TabIndex][2]);
        TemplateList[TabIndex][0] = true;
    }
}
function ShowHideTemplateUL(Handle, flag, MAXL){
    // flag: 'true' for expand, 'false' for shrink
    if(flag){
        Handle.stop().animate({
            height: MAXL + "px",
        }, 400, function () {
            DocEle.TemplatePanel.resize();
        });
    }else{
        Handle.stop().animate({
            height: "0px",
        }, 400, function () {
            DocEle.TemplatePanel.resize();
        });
    }
}

// StatePanel Button Click.
function LoadFileClick() {
   window.location.href='../CEAutoTool16/index.php';
}
//function LoadFileClick(){
    // ShowOrHide(true,DocEle.NOComplete);
    // EnterPop();
    // setTimeout('NOCompleteCancelClick()',4000);

//}
function NOCompleteCancelClick() {
    // CancelPop();
    // ShowOrHide(false,DocEle.NOComplete);
}

//function SaveFileClick() {
//     if (DocEle.Workbench.children().length > 0) {
//         // blur and tip to enter a custom name.
//         ShowOrHide(true, DocEle.PopSaveFile);
//         EnterPop();
//     } else {
//         ShowTip("工作台是空的");
//     }
// }
function SaveFileClick() {
    var projectid=shangweiji.project_id;
    var workbenchcontent=$('#ID_Workbench').html();
     var workbenchcontent=workbenchcontent.replace(/#/g,"%23");//ajax传参数时将#转义
     $.ajax({
                url: "../CEAutoTool16/include/savefile.php",
                type: "post",
                cache: false,
                data:JSON.stringify(
                       {"content":JSON.stringify(shangweiji),
                        "Uid":projectid,
                        "workbench":workbenchcontent
                      }
                ) ,
                contentType: false,
                processData: false,
                success: function (DATA) {
                   ShowTip(DATA);
                   //alert(DATA);
                 // console.log(DATA);
                }
            });
 }
function PlayModeClick() {
//  ShowOrHide(true,DocEle.NOComplete);
//     EnterPop();
   // setTimeout('NOCompleteCancelClick()',4000);
 }
function ExportFileClick(){
    var uid = shangweiji.project_id;
    var workbenchcontent=$('#ID_Workbench').html();
    $.ajax({
                url: "../CEAutoTool16/include/export.php",
                type: "post",
                cache: false,
                data:JSON.stringify(
                       {"content":JSON.stringify(shangweiji),
                        "Uid":uid,
                        "workbench":workbenchcontent
                      }
                ) ,
                contentType: false,
                processData: false,
                success: function (DATA) {
                   //alert(DATA);
                    ShowTip(DATA);
                }
            });
}
// function ExportFileClick() {
//     if (DocEle.Workbench.children().length > 0) {
//         // blur and tip to enter a custom name.
//         ShowOrHide(true, DocEle.PopExportFile);
//         EnterPop();
//     } else {
//         ShowTip("工作台是空的");
//     }
// }
function UpLoadFileInputChange() {
    var FileName = DocEle.UploadFileInput.val();
    if (FileName != "") {
        var Extension = FileName.substring(FileName.lastIndexOf(".") + 1);
        if (Extension == "ceatwol") {
            // blur and tip loading file.
            var FD = new FormData(DocEle.UploadFileForm[0]);
            $.ajax({
                url: "asp/UploadNativeFile.aspx",
                type: "post",
                data: FD,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (DATA) {
                    // Set up objects on workbench.
                    alert(DATA);
                    UploadFileInput.val("");
                },
                error: function (DATA) {
                    // Blur and tip failed to load.
                    EnterPop();
                    UploadFileInput.val("");
                }
            });
        } else {
            // tip illeagal extension.
            ShowTip("文件名不合法,必须为.ceatwol");
            DocEle.UploadFileInput.val("");
        }
    }
}

// PopSaveFile Module.
function PopSaveFileConfirmClick() {
    var SaveName = DocEle.PopSaveFileInput.val();
    // check file name.
    if (SaveName.replace(RegExp(" ", "g"), "") != "" && SaveName[0]!=" ") {
        var SaveContent = "";
        DocEle.Workbench.children().each(function () {
            var PT = $(this);
            SaveContent = SaveContent +
                GetNumberType(PT.data("name")) + "_" +
                parseInt(PT.position().left) + "_" +
                parseInt(PT.position().top) + "_" +
                parseInt(PT.width()) + "_" +
                parseInt(PT.height()) + "_" +
                PT.data("name") + ".png" + "_" +
                "none" + "_" +
                "none" + "_" +
                "none" + "_" +
                "none" + "\n";
        });
        SaveContent = SaveContent.substring(0, SaveContent.length - 1);
        $.ajax({
            url: "asp/SaveNativeFile.aspx",
            type: "post",
            data: "content=" + SaveContent,
            async: true,
            success: function (DATA) {
                if (DATA == "yes") {
                    location.href = "asp/DownloadNativeFile.aspx?savename=" + SaveName;
                }
            },
            error: function (DATA) {
                // blur and tip failed to save
            }
        });
    } else {
        ShowTip("文件名不合法");
    }
}
function PopSaveFileCancelClick() {
    CancelPop();
    ShowOrHide(false, DocEle.PopSaveFile);
}
// PopExportFile Module.
function PopExportFileConfirmClick() {
    var ExportName = DocEle.PopExportFileInput.val();
    if (ExportName.replace(RegExp(" ", "g"), "") != "" && ExportName[0] != " ") {
        var SaveContent = "";
        DocEle.Workbench.children().each(function () {
            var PT = $(this);
            SaveContent = SaveContent +
                GetNumberType(PT.data("name")) + "_" +
                parseInt(PT.position().left) + "_" +
                parseInt(PT.position().top) + "_" +
                parseInt(PT.width()) + "_" +
                parseInt(PT.height()) + "_" +
                PT.data("name") + ".png" + "_" +
                "none" + "_" +
                "none" + "_" +
                "none" + "_" +
                "none" + "\r" + "\n";
        });
        SaveContent = SaveContent.substring(0, SaveContent.length - 2);
        $.ajax({
            url: "asp/SaveExportFile.aspx",
            type: "post",
            data: "content=" + SaveContent,
            async: true,
            success: function (DATA) {
                if (DATA == "yes") {
                    location.href = "asp/DownloadExportFile.aspx?exportname=" + ExportName;
                }
            },
            error: function (DATA) {
                // blur and tip failed to save
            }
        });
    } else {
        ShowTip("文件名不合法");
    }
}
function PopExportFileCancelClick() {
    CancelPop();
    ShowOrHide(false, DocEle.PopExportFile);
}
// PopComment Module.
function PopCommentConfirmClick() {
    var Value = DocEle.PopCommentInput.val();
    if (Value.length > 6) {
        ShowTip("不得多于6个字!");
    } else {
        if (Value.indexOf("_") != -1 || Value.indexOf("|") != -1) {
            ShowTip("不得包含'_'和'|'");
        } else {
            GlobalParameters.RBtnMenuObject.attr("data-comment", Value);
            SetDetailPanel_SetComment(Value);
            ShowOrHide(false, DocEle.PopComment);
            CancelPop();
        }
    }
}
function PopCommentCancelClick() {
    CancelPop();
    ShowOrHide(false, DocEle.PopComment);
}
function Changename1(name){
     switch (name){//点击以下元素的时候，需要用户输入唯一属性和备注
         case "sodatank"://计量罐：碱罐
         case "gaugetank"://中性罐
         case "acidtank"://酸罐
              return "MeteringTank";
         case "sodastotank"://大储罐：碱储罐
         case "waterstotank"://纯水罐
         case "danti"://大单体
         case "acidstotank"://酸储罐
         case "jar"://母液
             return "Pitcher";
         case "reactor"://反应釜
         case "fupeitank"://复配罐
         case "mixtank"://预混罐都属于反应釜
             return "Kettle";
         case "tem_sensor"://传感器
             return "sensorT";//注意之前的首字母都是大写，这个是小写
         case "gravity_sensor":
             return "sensorW";
         case "ph_sensor":
             return "sensorP";
         case "ele_sensor":
             return "SensorL";
         case "handvalve1"://阀门 type2
         case "handvalve2":
         case "switchvalve":
             return "switch";//电机、阀门、滴加阀、泵中的哪一个分别用1,2,3,4来表示
         case "dropvalve"://滴加阀 type3
             return "ajust";
         case "convert11"://管道接口
         case "convert12":
         case "convert13":
         case "convert14":
         case "convert21":
         case "convert22":
         case "convert23":
         case "convert24":
            return "Convert";
         case "line11"://管道
         case "line12":
            return "Line";
         case "pump"://泵 type4
            return "switch";
         case"elect"://电机 type1
            return"switch";
         case "alarm"://高温报警警示条。
            return"TemperatureAlarm";
        }
}
    function Changename(name){
     switch (name){//点击以下元素的时候，需要用户输入唯一属性和备注
         case "sodatank"://计量罐：碱罐
         case "gaugetank"://中性罐
         case "acidtank"://酸罐
              return "计量罐";
         case "sodastotank"://大储罐：碱储罐
         case "waterstotank"://纯水罐
         case "danti"://大单体
         case "acidstotank"://酸储罐
         case "jar"://母液
             return "水罐";
         case "reactor"://反应釜
         case "fupeitank"://复配罐
         case "mixtank"://预混罐都属于反应釜
             return "反应釜";
         case "tem_sensor"://传感器
         case "gravity_sensor":
         case "ph_sensor":
         case "ele_sensor":
             return "传感器";
         case "handvalve1":
         case "handvalve2":
         case "switchvalve":
             return "阀门";
         case "dropvalve":
             return "滴加阀";
         case "convert11":
         case "convert12":
         case "convert13":
         case "convert14":
         case "convert21":
         case "convert22":
         case "convert23":
         case "convert24":
            return "管道接口";
         case "line11":
         case "line12":
            return "管道";
         case "pump":
            return "水泵";
         case"elect":
            return"电机";
         case "alarm":
            return"高温报警标签";
        }
}
// PopWeight Module.
function PopWeightConfirmClick() {//点击输入弹窗确定按钮时触发的事件，适用于拖拽计量罐、反应釜、水罐、传感器状态标签时。
    var SelectInputM = DocEle.PopSelectInputM.val();//在ID_PopWeightInput的input里输入的值
    var NumInputM = DocEle.PopNumInputM.val();
    var Remark_Value =  DocEle.PopRemarkInput.val();
    var unit_cut = "u"+SelectInputM;//通过用户输入来判别单元
    var Changedname1 = Changename1(submitcontroler.name);//用于生成json
    var Changedname = Changename(submitcontroler.name);//用于中文显示
    var PX=submitcontroler.left;//在444行，documentmousedown（）函数中赋值
    var PY=submitcontroler.top;
    var Pheight=submitcontroler.height;//这个在管道、管道接口上不适用
    var Pwidth=submitcontroler.width;
    var state=$("#"+submitcontroler.mathid).attr("data-modify");
    var Join = Changedname1+NumInputM+"_u"+SelectInputM;
    var element1 = {
					"control_type":Changedname1,
					"Name":Join,
					"Position":PX+","+ PY,
					"Height":Pheight,
					"Width":Pwidth,
					"Text": Remark_Value
				};
    //   alert(JSON.stringify(shangweiji.unit.length));
      //遍历shangweiji.unit数组，当unit_count等于uname时，在controls插入element1
     if(state== "ture"){
          if(confirm("检测到您已经输入数据，是否修改原先数据？"))
          {
            var define = $("#"+submitcontroler.mathid).attr("data-define");
            var define_cut = define.substr(-3);
             for(var i=0;i<shangweiji.unit.length;i++){
               if(define_cut == shangweiji.unit[i].uname){
                  var uarray = shangweiji.unit[i].controls;
                  jQuery.each(uarray,function(n,value){
                    if(value.Name==define){
                         uarray.splice(n,1);
                    }
                    });
                   //console.log(shangweiji);
           }
          }
        }
     }
      for(var i=0;i<shangweiji.unit.length;i++){
         if(unit_cut == shangweiji.unit[i].uname){
            var uarray = shangweiji.unit[i];
            uarray.controls.push(element1);
            break;
         }
        if(i==shangweiji.unit.length-1){
           ShowTip("您输入的名字与单元数不符！请检查后输入");
           return;
        }
      }        
    $("select[name='DeviceInput']").append("<option value='"+Changedname+Remark_Value+"'>"+Changedname+Remark_Value+"</option>");//传感器要选择设备的信息
    alert(JSON.stringify(shangweiji));
    if(Changedname1=="MeteringTank"){
        $("select[name='MeterSelect']").append("<option value='"+Remark_Value+"'>"+Remark_Value+"</option>");
        $("select[name='MeterSelectD']").append("<option value='"+Remark_Value+"'>"+Remark_Value+"</option>");
        $("select[name='MeterSelectO']").append("<option value='"+Remark_Value+"'>"+Remark_Value+"</option>");
        MeteringTank.push(Remark_Value);//将设备名存储在MeteringTank的数组中
    }
    //alert(MeteringTank);
    //将输入的变量显示在上边的状态栏上
    GlobalParameters.RBtnMenuObject.attr("data-weight", Join);
    GlobalParameters.RBtnMenuObject.attr("data-comment", Remark_Value);
    SetDetailPanel_SetID(Join);
    SetDetailPanel_SetComment(Remark_Value);
   $("#"+submitcontroler.mathid).attr("data-modify","ture");//将是否已经输入的标志改为ture
   $("#"+submitcontroler.mathid).attr("data-define",Join);//添加用户输入的id
    ShowOrHide(false, DocEle.PopWeight);
    CancelPop();
}
function PopWeightCancelClick() {
    CancelPop();
    ShowOrHide(false, DocEle.PopWeight);
}
//管道接口、管道弹窗的按钮
function PopLineConfirmClick() {//点击输入弹窗确定按钮时触发的事件
    var unit_cut ="u"+$('#MeterSelectL').val();
    var Property_Value = submitcontroler.mathid + "_" + unit_cut;
    var Changedname1 = Changename1(submitcontroler.name);
    var PX=submitcontroler.left;//在444行，documentmousedown（）函数中赋值
    var PY=submitcontroler.top;
    var Pheight=submitcontroler.lineheight;
    var Pwidth=submitcontroler.linewidth;
    var state=$("#"+submitcontroler.mathid).attr("data-modify");
    if(state== "ture"){
          if(confirm("检测到您已经输入数据，是否修改原先数据？"))
          {
            var define = $("#"+submitcontroler.mathid).attr("data-define");
            var define_cut = define.substr(-3);
             for(var i=0;i<shangweiji.unit.length;i++){
               if(define_cut == shangweiji.unit[i].uname){
                  var uarray = shangweiji.unit[i].controls;
                  jQuery.each(uarray,function(n,value){
                    if(value.Name==define){
                         uarray.splice(n,1);
                    }
                    });
                   console.log(shangweiji);
           }
          }
        }
     }
    switch(submitcontroler.name){//如果是管道的话，要注明type是X,或者是Y
        case "line11":
        submitcontroler.name = "X";
        var Pheight=submitcontroler.linewidth;
        var Pwidth="4";
        var H="Length";
        break;
        case "line12":
        submitcontroler.name = "Y";
        var Pheight=submitcontroler.lineheight;
        var Pwidth="4";
        var H="Length";
        break;
        case "convert11":
        submitcontroler.name = "convert_type1_down";
        var H = "Height";
        break;
         case "convert12":
         submitcontroler.name = "convert_type1_left";
        var H = "Height";
        break;
         case "convert13":
         submitcontroler.name = "convert_type1_up";
         var H = "Height";
         break;
         case "convert14":
         submitcontroler.name = "convert_type1_right";
         var H = "Height";
         break;
         case "convert21":
         submitcontroler.name = "convert_type2_right_down";
         var H = "Height";
         break;
         case "convert22":
         submitcontroler.name = "convert_type2_left_down";
         var H = "Height";
         break;
         case "convert23":
         submitcontroler.name = "convert_type2_left_up";
         var H = "Height";
         break;
         case "convert24":
         submitcontroler.name = "convert_type2_right_up";
         var H = "Height";
         break;
        default:break;
    }

    var element1 = '{"control_type":"'+Changedname1+'","Name":"'+Property_Value+'","Position":"'+PX+','+PY+'","Width":"'+Pwidth+'","'+H+'":"'+Pheight+'","Type":"'+submitcontroler.name+'"}';
        element1 = JSON.parse(element1);
    //   alert(JSON.stringify(shangweiji.unit.length));
      //遍历shangweiji.unit数组，当unit_count等于uname时，在controls插入element1
      for(var i=0;i<shangweiji.unit.length;i++){
         if(unit_cut == shangweiji.unit[i].uname){
            var uarray = shangweiji.unit[i];
            uarray.controls.push(element1);
            break;
         }
        if(i==shangweiji.unit.length-1){
           ShowTip("您输入的名字与单元数不符！请检查后输入");
           return;
        }
      }
   alert(JSON.stringify(shangweiji));
    GlobalParameters.RBtnMenuObject.attr("data-weight", Property_Value);
   // GlobalParameters.RBtnMenuObject.attr("data-comment", Remark_Value);
   SetDetailPanel_SetID(Property_Value);
   // SetDetailPanel_SetComment(Remark_Value);
   $("#"+submitcontroler.mathid).attr("data-modify","ture");//将是否已经输入的标志改为ture
   $("#"+submitcontroler.mathid).attr("data-define",Property_Value);//添加用户输入的id
   ShowOrHide(false, DocEle.PopLine);
    CancelPop();
}
function PopLineCancelClick() {
    CancelPop();
    ShowOrHide(false, DocEle.PopLine);
}
//传感器弹窗的确认、取消按钮
function PopSensorConfirmClick() {//点击输入弹窗确定按钮时触发的事件，适用于拖拽传感器时。
    var selectunit = $('#MeterSelectS').val();
    var selectnum =  $('#ID_PopNumInputS').val();
    var Decimal_Value = DocEle.PopDecimalInput.val();
    var Device_Value =  $('#DeviceInput').val();
    var Matter_Value = DocEle.PopMatterInput.val();
    var TCtrlInfo_Value1 = $('#ID_PopTCtrlInfoInput1').val();
    var TCtrlInfo_Value2 = $('#ID_PopTCtrlInfoInput2').val();
    var TCtrlInfo_Value3 = $('#ID_PopTCtrlInfoInput3').val();
    var TCtrlInfo_Value4 = $('#ID_PopTCtrlInfoInput4').val();
    var TCtrlInfo_Value = TCtrlInfo_Value1+","+TCtrlInfo_Value2+","+TCtrlInfo_Value3+","+TCtrlInfo_Value4;
    var THAlarm_Value = DocEle.PopTHAlarmInput.val();
    var unit_cut = "u"+selectunit;//通过用户输入来判别单元
    var Changedname1 = Changename1(submitcontroler.name);
    var Property_Value = Changedname1+selectnum+"_u"+selectunit;
    //alert (submitcontroler.name);
    //return;
    var PX=submitcontroler.left;//在444行，documentmousedown（）函数中赋值
    var PY=submitcontroler.top;
    var Pheight=submitcontroler.height;//这个在管道、管道接口上不适用
    var Pwidth=submitcontroler.width;
    var state=$("#"+submitcontroler.mathid).attr("data-modify");
    if(state== "ture"){
          if(confirm("检测到您已经输入数据，是否修改原先数据？"))
          {
            var define = $("#"+submitcontroler.mathid).attr("data-define");
            var define_cut = define.substr(-3);
             for(var i=0;i<shangweiji.unit.length;i++){
               if(define_cut == shangweiji.unit[i].uname){
                  var uarray = shangweiji.unit[i].controls;
                  jQuery.each(uarray,function(n,value){
                    if(value.Name==define){
                         uarray.splice(n,1);
                    }
                    });
                   console.log(shangweiji);
           }
          }
        }
     }
    var element1 = {
					"control_type":"Sensor",
					"Name":Property_Value,
					"Position":PX+","+ PY,
					"Height": Pheight,
					"Width":Pwidth,
					"DecimalPlaces":Decimal_Value,
					"Device":Device_Value,//是设备名，不是设备的id
					"Matter":Matter_Value,//如：水
					"TCtrlInfo":TCtrlInfo_Value,
					"THAlarm":THAlarm_Value
				};
    //   alert(JSON.stringify(shangweiji.unit.length));
      //遍历shangweiji.unit数组，当unit_count等于uname时，在controls插入element1
      for(var i=0;i<shangweiji.unit.length;i++){
         if(unit_cut == shangweiji.unit[i].uname){
            var uarray = shangweiji.unit[i];
            uarray.controls.push(element1);
            break;
         }
        if(i==shangweiji.unit.length-1){
           ShowTip("您输入的名字与单元数不符！请检查后输入");
           return;
        }
      }
    alert(JSON.stringify(shangweiji));
    $("select[name='SwitchSensorName']").append("<option value='"+Property_Value+"'>"+Property_Value+"</option>");
    if(submitcontroler.name=="tem_sensor"){
     $("select[name='SensorSelect']").append("<option value='"+Property_Value+"'>"+Property_Value+"</option>");
     $("select[name='AlarmsensorInput']").append("<option value='"+Property_Value+"'>"+Property_Value+"</option>");
    }
    if(submitcontroler.name=="gravity_sensor"){
    $("select[name='SwitchSensorUsing']").append("<option value='"+Property_Value+"'>"+Property_Value+"</option>");
    } 
     Sensor.push(Property_Value);//将传感器的id传入数组
    GlobalParameters.RBtnMenuObject.attr("data-weight", Property_Value);
    //GlobalParameters.RBtnMenuObject.attr("data-comment", Remark_Value);
    SetDetailPanel_SetID(Property_Value);
    //SetDetailPanel_SetComment(Remark_Value);
    $("#"+submitcontroler.mathid).attr("data-modify","ture");//将是否已经输入的标志改为ture
   $("#"+submitcontroler.mathid).attr("data-define",Property_Value);//添加用户输入的id
    ShowOrHide(false, DocEle.PopSensor);
    CancelPop();
}
function PopSensorCancelClick() {
    CancelPop();
    ShowOrHide(false, DocEle.PopSensor);
}
//高温报警标签弹窗的确认、取消按钮
function PopAlarmConfirmClick() {//点击输入弹窗确定按钮时触发的事件
    var Property_Value = "TemperatureAlarm"+submitcontroler.mathid.substr(-3)+"_u"+$('#MeterSelectA').val();//在ID_PopWeightInput的input里输入的值
    var Sensor_Value = $('#AlarmsensorInput').val();
    var unit_cut = "u"+$('#MeterSelectA').val();//截取用户输入的后三个字，也就是单元数
    var PX=submitcontroler.left;//在444行，documentmousedown（）函数中赋值
    var PY=submitcontroler.top;
    var Pheight=submitcontroler.height;
    var Pwidth=submitcontroler.width;
    var state=$("#"+submitcontroler.mathid).attr("data-modify");
    if(state== "ture"){
          if(confirm("检测到您已经输入数据，是否修改原先数据？"))
          {
            var define = $("#"+submitcontroler.mathid).attr("data-define");
            var define_cut = define.substr(-3);
             for(var i=0;i<shangweiji.unit.length;i++){
               if(define_cut == shangweiji.unit[i].uname){
                  var uarray = shangweiji.unit[i].controls;
                  jQuery.each(uarray,function(n,value){
                    if(value.Name==define){
                         uarray.splice(n,1);
                    }
                    });
                   console.log(shangweiji);
           }
          }
        }
     }
    var element1 = {
					"control_type":"TemperatureAlarm",
					"Name":Property_Value,//线和id名字。只需要保证不一样就可以了，不需要排1、2、3、4序号
					"Position":PX+","+ PY,
					"Height": Pheight,
					"Width":Pwidth,
                    "SensorName":Sensor_Value
				};
    //   alert(JSON.stringify(shangweiji.unit.length));
      //遍历shangweiji.unit数组，当unit_count等于uname时，在controls插入element1
      for(var i=0;i<shangweiji.unit.length;i++){
         if(unit_cut == shangweiji.unit[i].uname){
            var uarray = shangweiji.unit[i];
            uarray.controls.push(element1);
            break;
         }
        if(i==shangweiji.unit.length-1){
           ShowTip("您输入的名字与单元数不符！请检查后输入");
           return;
        }
      }
    alert(JSON.stringify(shangweiji));
    GlobalParameters.RBtnMenuObject.attr("data-weight", Property_Value);
    //GlobalParameters.RBtnMenuObject.attr("data-comment", Remark_Value);
    SetDetailPanel_SetID(Property_Value);
    //SetDetailPanel_SetComment(Remark_Value);
    $("#"+submitcontroler.mathid).attr("data-modify","ture");//将是否已经输入的标志改为ture
   $("#"+submitcontroler.mathid).attr("data-define",Property_Value);//添加用户输入的id
    ShowOrHide(false, DocEle.PopAlarm);
    CancelPop();
}
function PopAlarmCancelClick() {
    CancelPop();
    ShowOrHide(false, DocEle.PopAlarm);
}
//电机、SwitchSelect、滴加阀、泵（Switch）弹窗确认取消按钮
function PopSwitchConfirmClick() {//点击输入弹窗确定按钮时触发的事件
    var Changedname1 = Changename1(submitcontroler.name);
    var Property_Value = Changedname1+$('#SwitchNumInput').val()+"_u"+$('#MeterSelectH').val();//在ID_PopWeightInput的input里输入的值
    var Name_Value =$('#SwitchSensorName').val();
    var Using_Value = $('#SwitchSensorUsing').val();
    var Matter_Value = DocEle.PopSwitchMatterInput.val();
    var Delay_Value = DocEle.PopFeedbackdelay.val();
    var unit_cut = "u"+$('#MeterSelectH').val();//截取用户输入的后三个字，也就是单元数
    var PX=submitcontroler.left;//在444行，documentmousedown（）函数中赋值
    var PY=submitcontroler.top;
    var Pheight=submitcontroler.height;
    var Pwidth=submitcontroler.width;
    var state=$("#"+submitcontroler.mathid).attr("data-modify");
    if(state== "ture"){
          if(confirm("检测到您已经输入数据，是否修改原先数据？"))
          {
            var define = $("#"+submitcontroler.mathid).attr("data-define");
            var define_cut = define.substr(-3);
             for(var i=0;i<shangweiji.unit.length;i++){
               if(define_cut == shangweiji.unit[i].uname){
                  var uarray = shangweiji.unit[i].controls;
                  jQuery.each(uarray,function(n,value){
                    if(value.Name==define){
                         uarray.splice(n,1);
                    }
                    });
                   console.log(shangweiji);
           }
          }
        }
     }
     switch (submitcontroler.name){
         case "handvalve1"://阀门 type2
         case "handvalve2":
         case "switchvalve":
         switch_type="2";
         Switch.push(Property_Value);//将id保存在数组中，这没啥用现在
         //alert(Switch);
         $("select[name='SwitchSelect']").append("<option value='"+Property_Value+"'>"+Property_Value+"</option>");
         $("select[name='SwitchSelect1']").append("<option value='"+Property_Value+"'>"+Property_Value+"</option>");
         $('.selectpicker').selectpicker('refresh');//因为要动态添加option,所以实时刷新。
         break;
         case "dropvalve"://滴加阀
         switch_type="3";
         Ajust.push(Property_Value);//现在没啥用
         $("select[name='AjustSelect']").append("<option value='"+Property_Value+"'>"+Property_Value+"</option>");
         $('.selectpicker').selectpicker('refresh');//因为要动态添加option,所以实时刷新。
         break;
         case "pump":
         switch_type="4";
         break;
         case"elect":
         switch_type="1";
         break;
         default:
         switch_type=null;
         break;
     }
    var element1 = {
					"control_type":"Switch",
					"Name":Property_Value,
                    "RealName":Changename(submitcontroler.name),
					"Position":PX+","+ PY,
					"Height": Pheight,
					"Width":Pwidth,
                    "Type":switch_type,
                    "SensorName":Name_Value,
					"SensorUsing":Using_Value,
					"Matter":Matter_Value,
                    "Feedbackdelay":Delay_Value
				};
    //   alert(JSON.stringify(shangweiji.unit.length));
      //遍历shangweiji.unit数组，当unit_count等于uname时，在controls插入element1
      for(var i=0;i<shangweiji.unit.length;i++){
         if(unit_cut == shangweiji.unit[i].uname){
            var uarray = shangweiji.unit[i];
            uarray.controls.push(element1);
            break;
         }
        if(i==shangweiji.unit.length-1){
           ShowTip("您输入的名字与单元数不符！请检查后输入");
           return;
        }
      }
    //alert(JSON.stringify(shangweiji));
    GlobalParameters.RBtnMenuObject.attr("data-weight", Property_Value);
    //GlobalParameters.RBtnMenuObject.attr("data-comment", Remark_Value);
    SetDetailPanel_SetID(Property_Value);
    //SetDetailPanel_SetComment(Remark_Value);
    $("#"+submitcontroler.mathid).attr("data-modify","ture");//将是否已经输入的标志改为ture
   $("#"+submitcontroler.mathid).attr("data-define",Property_Value);//添加用户输入的id
    ShowOrHide(false, DocEle.PopSwitch);
    CancelPop();
}
function PopSwitchCancelClick() {
    CancelPop();
    submitcontroler.name=null;
    ShowOrHide(false, DocEle.PopSwitch);
}
// PopSpeed Module.
function PopSpeedConfirmClick() {
    var Value = DocEle.PopSpeedInput.val();
    GlobalParameters.RBtnMenuObject.attr("data-speed", Value);
    SetDetailPanel_SetSpeed(Value);
    ShowOrHide(false, DocEle.PopSpeed);
    CancelPop();
}
function PopSpeedCancelClick() {
    CancelPop();
    ShowOrHide(false, DocEle.PopSpeed);
}

// Set System's State.
function SetSystemSate(SystemState) {
    GlobalParameters.SystemState = SystemState;
    var SystemStateText = "NULL";
    switch (SystemState) {
        case 0:
            SystemStateText = "待机";
            break;
        case 1:
            SystemStateText = "放置对象"
            break;
        case 2:
            SystemStateText = "移动对象";
            break;
        case 3:
            SystemStateText = "调整位置";
            break;
        case 4:
            SystemStateText = "接口连接";
            break;
        case 5:
            SystemStateText = "仿真待机";
            break;
        case 6:
            SystemStateText = "仿真播放";
            break;
        case 7:
            SystemStateText = "仿真回放";
            break;
        default: break;
    }
    DocEle.SystemState.text(SystemStateText);
}

// RButtonMenu Options Click.
// 1.Input 2.Comment 3.Rename 4.Delete 5.PipeSpeed
//点击右键的输入时，出现的弹窗
function RButtonMenuOption1Click() {
     var changedname = Changename(submitcontroler.name);
     //alert(submitcontroler.name);
    //alert (DocEle.NewAsset.data("name"));这是选择的元素的name
    switch (submitcontroler.name){//点击以下元素的时候，需要用户输入唯一属性和备注
         case "sodatank"://计量罐：碱罐
         case "gaugetank"://中性罐
         case "acidtank"://酸罐
         case "reactor"://反应釜
         case "fupeitank"://复配罐
         case "mixtank"://预混罐都属于反应釜
         case "sodastotank"://大储罐：碱储罐
         case "waterstotank"://纯水罐
         case "danti"://大单体
         case "acidstotank"://酸储罐
         case "jar"://母液 这里还缺了传感器状态标签
          $('#ID_Poptype').html("<p class='lable2' style='margin-top:6px'>"+changedname+"</p>");        
    //       var Creatoption = UnitSelect();
    //       swal({
    //   title: '控件类型：'+changedname,
    //   html:"<form class='form-horizontal'>"+
    //    "<div class='form-group'><label for='ID_PopWeightInput' class='col-sm-4 control-label lable2'>请选择单元数:</label><div class='col-sm-7'>"
    //     +"<select class='form-control' id='MeterSelectM' name='MeterSelectM'>"+
    //     Creatoption+"</select></div></div>"
    //     +"<div class=''form-group'><label class='col-sm-4 control-label lable2'>请填写序号:</label><div class='col-sm-7'>"
    //     +"<input type='text' class='form-control' id='ID_PopNumInputM' placeholder='如：2'></div></div></form>",
    //    preConfirm: function() {
    //     return new Promise(function(resolve) {
    //       resolve([
    //         $('#swal-input1').val(),
    //         $('#swal-input2').val()
    //       ]);
    //     });
    //   }
    // }).then(function(result) {
    //   if (result) {
    //     swal(JSON.stringify(result));
    //   }
    // });
          ShowOrHide(false, DocEle.RButtonMenu);
              //DocEle.PopPropertyInput.val(GlobalParameters.RBtnMenuObject.attr("data-weight"));
             ShowOrHide(true, DocEle.PopWeight);
             EnterPop();
             break;
        case "convert11":
        case "convert12":
        case "convert13":
        case "convert14":
        case "convert21":
        case "convert22":
        case "convert23":
        case "convert24":
        case "line11":
        case "line12":
             $('#ID_Poptype2').html("<p class='lable2' style='margin-top:6px'>"+changedname+"</p>");
              ShowOrHide(false, DocEle.RButtonMenu);
              //DocEle.PopPropertyInput.val(GlobalParameters.RBtnMenuObject.attr("data-weight"));
              ShowOrHide(true, DocEle.PopLine);
              EnterPop();
              break;
        case "tem_sensor"://传感器
        case "gravity_sensor":
        case "ph_sensor":
        case "ele_sensor":
              $('#ID_Poptype3').html("<p class='lable2' style='margin-top:6px'>"+changedname+"</p>");
              ShowOrHide(false, DocEle.RButtonMenu);
              //DocEle.PopPropertyInput.val(GlobalParameters.RBtnMenuObject.attr("data-weight"));
              ShowOrHide(true, DocEle.PopSensor);
              EnterPop();
              break;
        case "alarm"://高温报警警示条
              $('#ID_Poptype4').html("<p class='lable2' style='margin-top:6px'>"+changedname+"</p>");
              ShowOrHide(false, DocEle.RButtonMenu);
              //DocEle.PopPropertyInput.val(GlobalParameters.RBtnMenuObject.attr("data-weight"));
              ShowOrHide(true, DocEle.PopAlarm);
              EnterPop();
              break;
        case "pump"://电机、阀门、滴加阀、泵（Switch）
        case "elect":
        case "handvalve1":
        case "handvalve2":
        case "switchvalve":
        case "dropvalve":
              $('#ID_Poptype5').html("<p class='lable2' style='margin-top:6px'>"+changedname+"</p>");
              ShowOrHide(false, DocEle.RButtonMenu);
             // DocEle.PopPropertyInput.val(GlobalParameters.RBtnMenuObject.attr("data-weight"));
              ShowOrHide(true, DocEle.PopSwitch);
              EnterPop();
              break;
             default:break;
     }

}
function RButtonMenuOption2Click() {
    ShowOrHide(false, DocEle.RButtonMenu);
    DocEle.PopCommentInput.val(GlobalParameters.RBtnMenuObject.attr("data-comment"));
    ShowOrHide(true, DocEle.PopComment);
    EnterPop();
}
function RButtonMenuOption3Click() {

}

function RButtonMenuOption4Click() {
   var state = $("#"+submitcontroler.mathid).attr("data-modify");
   if(state=="ture"){
       var define = $("#"+submitcontroler.mathid).attr("data-define");
            var define_cut = define.substr(-3);
             for(var i=0;i<shangweiji.unit.length;i++){
               if(define_cut == shangweiji.unit[i].uname){
                  var uarray = shangweiji.unit[i].controls;
                  jQuery.each(uarray,function(n,value){
                    if(value.Name==define){
                         uarray.splice(n,1);
                    }
                    });
                   console.log(shangweiji);
           }
          }
   }
         GlobalParameters.RBtnMenuObject.remove();
         ShowOrHide(false, DocEle.RButtonMenu);
}
//  document.onkeydown = function (event) {
//             var e = event || window.event;
//             alert(e);
//             var keyCode = e.keyCode || e.which;
//             switch (keyCode) {
//                 case 46:
//                    RButtonMenuOption4Click();
//                     break;
//                 default:
//                     break;
//             }
//         }
function RButtonMenuOption5Click() {

}

// Create A New Workbench Object.
function CreateWorkbenchObject(Object) {
    DocEle.NewAsset = $("<div></div>");
    DocEle.NewAsset.attr("id", "ID_NewAsset");
    DocEle.NewAsset.attr("data-name", Object.data("name"));
    DocEle.NewAsset.attr("data-comment", "");
    DocEle.NewAsset.attr("data-imgw", Object.data("imgw"));
    DocEle.NewAsset.attr("data-imgh", Object.data("imgh"));
    DocEle.NewAsset.attr("data-modify","flase");
    DocEle.NewAsset.css({
        "left": parseInt(GlobalParameters.LastMouseX - Object.data("imgw") / 2) + "px",
        "top": parseInt(GlobalParameters.LastMouseY - Object.data("imgh") / 2) + "px",
    });
    var InterfaceHandle = new Array();
    var InterfaceDescription = new Array();
    var InterfaceLength = 2;
    var ClassName = "";
    switch (Object.data("name")) {
        case "sodatank":
            ClassName = "WorkbenchSodaTank";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForSodaTankI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForSodaTankI2" }
            DocEle.NewAsset.attr("data-weight", "");
            break;
        case "gaugetank":
            ClassName = "WorkbenchGaugeTank";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForGaugeTankI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForGaugeTankI2" }
            DocEle.NewAsset.attr("data-weight", "");
            break;
        case "acidtank":
            ClassName = "WorkbenchAcidTank";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForAcidTankI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForAcidTankI2" }
            DocEle.NewAsset.attr("data-weight", "");
            break;
        case "sodastotank":
            ClassName = "WorkbenchSodaStoTank";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForSodaStoTankI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForSodaStoTankI2" }
            DocEle.NewAsset.attr("data-weight", "");
            break;
        case "waterstotank":
            ClassName = "WorkbenchWaterStoTank";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForWaterStoTankI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForWaterStoTankI2" }
            DocEle.NewAsset.attr("data-weight", "");
            break;
        case "danti":
            ClassName = "WorkbenchDanTi";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForDanTiI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForDanTiI2" }
            break;
        case "acidstotank":
            ClassName = "WorkbenchAcidStoTank";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForAcidStoTankI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForAcidStoTankI2" }
            DocEle.NewAsset.attr("data-weight", "");
            break;
        case "jar":
            ClassName = "WorkbenchJar";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForJarI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForJarI2" }
            break;
        case "reactor":
            ClassName = "WorkbenchReactor";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForReactorI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForReactorI2" }
            InterfaceDescription[2] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForReactorI3" }
            InterfaceDescription[3] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForReactorI4" }
            InterfaceDescription[4] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForReactorI5" }
            InterfaceLength = 5;
            break;
        case "fupeitank":
            ClassName = "WorkbenchFuPeiTank";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForFuPeiTankI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForFuPeiTankI2" }
            InterfaceDescription[2] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForFuPeiTankI3" }
            InterfaceDescription[3] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForFuPeiTankI4" }
            InterfaceDescription[4] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForFuPeiTankI5" }
            InterfaceLength = 5;
            break;
        case "mixtank":
            ClassName = "WorkbenchMixTank";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForMixTankI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForMixTankI2" }
            InterfaceDescription[2] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForMixTankI3" }
            InterfaceDescription[3] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForMixTankI4" }
            InterfaceDescription[4] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForMixTankI5" }
            InterfaceLength = 5;
            break;
        case "handvalve1":
            ClassName = "WorkbenchHandValve1";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForHandValve1I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForHandValve1I2" }
            break;
        case "handvalve2":
            ClassName = "WorkbenchHandValve2";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForHandValve2I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForHandValve2I2" }
            break;
        case "dropvalve":
            ClassName = "WorkbenchDropValve";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForDropValveI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForDropValveI2" }
            DocEle.NewAsset.attr("data-speed", "");
            break;
        case "switchvalve":
            ClassName = "WorkbenchSwitchValve";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForSwitchValveI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForSwitchValveI2" }
            break;
        case "convert11":
            ClassName = "WorkbenchConvert11";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForConvert11I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForConvert11I2" }
            InterfaceDescription[2] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForConvert11I3" }
            InterfaceLength = 3;
            break;
        case "convert12":
            ClassName = "WorkbenchConvert12";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForConvert12I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForConvert12I2" }
            InterfaceDescription[2] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForConvert12I3" }
            InterfaceLength = 3;
            break;
        case "convert13":
            ClassName = "WorkbenchConvert13";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForConvert13I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForConvert13I2" }
            InterfaceDescription[2] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForConvert13I3" }
            InterfaceLength = 3;
            break;
        case "convert14":
            ClassName = "WorkbenchConvert14";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForConvert14I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForConvert14I2" }
            InterfaceDescription[2] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForConvert14I3" }
            InterfaceLength = 3;
            break;
        case "convert21":
            ClassName = "WorkbenchConvert21";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForConvert21I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForConvert21I2" }
            break;
        case "convert22":
            ClassName = "WorkbenchConvert22";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForConvert22I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForConvert22I2" }
            break;
        case "convert23":
            ClassName = "WorkbenchConvert23";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForConvert23I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForConvert23I2" }
            break;
        case "convert24":
            ClassName = "WorkbenchConvert24";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForConvert24I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForConvert24I2" }
            break;
        case "line11":
            ClassName = "WorkbenchLine11";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForLine11I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForLine11I2" }
            break;
        case "line12":
            ClassName = "WorkbenchLine12";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForLine12I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForLine12I2" }
            break;
        case "pump":
            ClassName = "WorkbenchPump";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForPumpI1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForPumpI2" }
            break;
        case "elect":
            ClassName = "WorkbenchElect";
            InterfaceLength = 0;
            break;
       case "tem_sensor":
            ClassName = "Workbenchtem_sensor";
            InterfaceLength = 0;
            break;
        case "gravity_sensor":
            ClassName = "Workbenchgravity_sensor";
            InterfaceLength = 0;
            break;
        case "ph_sensor":
            ClassName = "Workbenchph_sensor";
            InterfaceLength = 0;
            break;
        case "ele_sensor":
            ClassName = "Workbenchele_sensor";
            InterfaceLength = 0;
            break;
        case "alarm":
            ClassName = "Workbenchalarm";
            InterfaceLength = 0;
            break;

    }
    // clear MovingInterface.
    MovingInterface = [];
    for (var i = 0; i < InterfaceLength; i++) {
        InterfaceHandle[i] = $("<div></div>");
        InterfaceHandle[i].attr("data-type", "Interface");
        InterfaceHandle[i].attr("data-iconnect", "");
        InterfaceHandle[i].attr("data-inumber", "I" + (i + 1));
        InterfaceHandle[i].attr("data-itype", InterfaceDescription[i].IType + InterfaceDescription[i].IDirect);
        InterfaceHandle[i].addClass(InterfaceDescription[i].IType);
        InterfaceHandle[i].addClass(InterfaceDescription[i].IType + InterfaceDescription[i].ISuffix);
        InterfaceHandle[i].appendTo(DocEle.NewAsset);
        var Interface = new Array();
        Interface[0] = InterfaceHandle[i];
        Interface[1] = null;
        MovingInterface.push(Interface);
        var ICInfoSub = [false, null, 9999];
        ICInfo.push(ICInfoSub);
    }
    AddOrRemoveClass(true, DocEle.NewAsset, ClassName);
    DocEle.NewAsset.appendTo($(document.body));
}

// Enter Pop And Cancel Pop.
function EnterPop() {
    ShowOrHide(true, DocEle.PopRoot);
    AddOrRemoveClass(true, DocEle.Root, "RootBlur");
    DocEle.PopMenuContainer.animate({
        height: "520px",
        "margin-top": "-=135px"
    }, 150).animate({
        height: "470px",
        "margin-top": "+=25px"
    }, 50);
}
function CancelPop() {
    DocEle.PopMenuContainer.animate({
        height: "470px",
        "margin-top": "-=25px"
    }, 50).animate({
        height: "0px",
        "margin-top": "+=135px"
    }, 150, function () {
        AddOrRemoveClass(false, DocEle.Root, "RootBlur");
        ShowOrHide(false, DocEle.PopRoot);
    });
}

// Show Tips.
function ShowTip(Tips) {
    DocEle.TipRoot.stop(true);
    DocEle.TipRoot.css({
        "margin-top": "50px",
        "opacity": "0"
    });
    DocEle.TipRoot.text(Tips);
    DocEle.TipRoot.show();
    DocEle.TipRoot.animate({
        "margin-top": "-25px",
        "opacity": "1"
    }, 300).animate({
        "margin-top": "-25px",
        "opacity": "1"
    }, 1000).animate({
        "margin-top": "-100px",
        "opacity": "0"
    }, 300, function () {
        DocEle.TipRoot.hide();
    });
}
// Export Object Type Tranformation.
function GetNumberType(name) {
    switch (name) {
        case "sodatank":
        case "gaugetank":
        case "acidtank":
        case "sodastotank":
        case "waterstotank":
        case "danti":
        case "acidstotank":
        case "jar":
        case "reactor":
        case "fupeitank":
        case "mixtank":
            return "1";
            break;
        case "handvalve1":
        case "handvalve2":
        case "dropvalve":
        case "switchvalve":
        case "convert11":
        case "convert12":
        case "convert13":
        case "convert14":
        case "convert21":
        case "convert22":
        case "convert23":
        case "convert24":
        case "line11":
        case "line12":
        case "pump":
        case "elect":
        case "tem_sensor":
        case "ph_sensor":
        case "gravity_sensor":
        case "ele_sensor":
        case "alarm":
            return "2";
            break;
        default:
            return "0";
            break;
    }
}
// Formal Class Name Tranformation.
function GetFormalType(name) {
    switch (name) {
        case "sodatank":
            return "WorkbenchSodaTank";
            break;
        case "gaugetank":
            return "WorkbenchGaugeTank";
            break;
        case "acidtank":
            return "WorkbenchAcidTank";
            break;
        case "sodastotank":
            return "WorkbenchSodaStoTank";
            break;
        case "waterstotank":
            return "WorkbenchWaterStoTank";
            break;
        case "danti":
            return "WorkbenchDanTi";
            break;
        case "acidstotank":
            return "WorkbenchAcidStoTank";
            break;
        case "jar":
            return "WorkbenchJar";
            break;
        case "reactor":
            return "WorkbenchReactor";
            break;
        case "fupeitank":
            return "WorkbenchFuPeiTank";
            break;
        case "mixtank":
            return "WorkbenchMixTank";
            break;
        case "handvalve1":
            return "WorkbenchHandValve1";
            break;
        case "handvalve2":
            return "WorkbenchHandValve2";
            break;
        case "dropvalve":
            return "WorkbenchDropValve";
            break;
        case "switchvalve":
            return "WorkbenchSwitchValve";
            break;
        case "convert11":
            return "WorkbenchConvert11";
            break;
        case "convert12":
            return "WorkbenchConvert12";
            break;
        case "convert13":
            return "WorkbenchConvert13";
            break;
        case "convert14":
            return "WorkbenchConvert14";
            break;
        case "convert21":
            return "WorkbenchConvert21";
            break;
        case "convert22":
            return "WorkbenchConvert22";
            break;
        case "convert23":
            return "WorkbenchConvert23";
            break;
        case "convert24":
            return "WorkbenchConvert24";
            break;
        case "line11":
            return "WorkbenchLine11";
            break;
        case "line12":
            return "WorkbenchLine12";
            break;
        case "pump":
            return "WorkbenchPump";
            break;
        case "elect":
            return "WorkbenchElect";
            break;
        case "tem_sensor":
            return "Workbenchtem_sensor";
            break;
        case "gravity_sensor":
            return "Workbenchgravity_sensor";
            break;
        case "ph_sensor":
            return "Workbenchph_sensor";
            break;
        case "ph_sensor":
            return "Workbenchph_sensor";
            break;
        case "alarm":
            return "Workbenchalarm";
            break;
        default:
            return "NULL";
            break;
    }
}

// Document Mouse Move System State Case Function.
function DocMMSSCase1(e) {
    // set NewAsset's position following the mouse.
    DocEle.NewAsset.css({
        "left": DocEle.NewAsset.position().left + parseInt(e.pageX) - GlobalParameters.LastMouseX + "px",
        "top": DocEle.NewAsset.position().top + parseInt(e.pageY) - GlobalParameters.LastMouseY + "px",
    });
    SetDetailPanel_SetPosition(DocEle.NewAsset.offset().left - DocEle.Workbench.offset().left, DocEle.NewAsset.position().top - DocEle.Workbench.offset().top);
    // flag: 'true' for in Workbench, 'false' for out Workbench.
    var isNAinWB = IsInDIVByPos(DocEle.NewAsset, DocEle.Workbench);
    if (!isNAinWB) {
        AddOrRemoveClass(true, DocEle.NewAsset, "NewAssetNotPutting");
    } else {
        AddOrRemoveClass(false, DocEle.NewAsset, "NewAssetNotPutting");
        // set interfaces.
        SetInterface(MovingInterface);
    }
}
function DocMMSSCase2(e) {
    var isOutOfWB = false;
    for (var i = 0; i < GlobalParameters.MovingWBObject.length; i++) {
        var Object = GlobalParameters.MovingWBObject[i];
        var Left = Object.position().left + parseInt(e.pageX) - GlobalParameters.LastMouseX;
        var Top = Object.position().top + parseInt(e.pageY) - GlobalParameters.LastMouseY;
        if (Left > 0
        && (Left + Object.width()) < DocEle.Workbench.width()
        && Top > 0
        && (Top + Object.height()) < DocEle.Workbench.height()) {

        } else {
            isOutOfWB = true;
        }
    }
    if (!isOutOfWB) {
        for (var i = 0; i < GlobalParameters.MovingWBObject.length; i++) {
            var Object = GlobalParameters.MovingWBObject[i];
            var Left = Object.position().left + parseInt(e.pageX) - GlobalParameters.LastMouseX;
            var Top = Object.position().top + parseInt(e.pageY) - GlobalParameters.LastMouseY;
            Object.css({
                "left": Object.position().left + parseInt(e.pageX) - GlobalParameters.LastMouseX + "px",
                "top": Object.position().top + parseInt(e.pageY) - GlobalParameters.LastMouseY + "px",
            });
            if (i == 0) {
                SetDetailPanel_SetPosition(Object.position().left, Object.position().top);
            }
        }
        SetInterface(MovingInterface);
    } else {
        SetSystemSate(0);
    }
}
function DocMMSSCase3(e) {
    var deltaX = e.pageX - GlobalParameters.LastMouseX;
    var deltaY = e.pageY - GlobalParameters.LastMouseY;
    var PipeNeed = 0;
    var PipeX = 0;
    var PipeY = 0;
    GlobalParameters.AdjustWBObject.children().filter("div[data-type='Interface']").each(function () {
        PipeNeed++;
        var Interface = $(this);
        var IConnect = Interface.attr("data-iconnect");
        if (IConnect != "") {
            var IDArray = IConnect.split("#");
            var DesObject = $("#" + IDArray[0]);
            var Name = DesObject.data("name");
            var DesInterface = DesObject.children().filter("div[data-inumber='" + IDArray[1] + "']");
            var IType = DesInterface.data("itype");
            if (Name == "line11") {
                if (IType == "InterfaceLine11Left") {
                    if (deltaX >= 0) {
                        var leftWidth = DesObject.width() - deltaX;
                        if (leftWidth >= 8) {
                            PipeX++;
                        }
                    } else {
                        PipeX++;
                    }
                } else {
                    if (deltaX < 0) {
                        var leftWidth = DesObject.width() + deltaX;
                        if (leftWidth >= 8) {
                            PipeX++;
                        }
                    } else {
                        PipeX++;
                    }
                }
            } else if (Name == "line12") {
                if (IType == "InterfaceLine12Up") {
                    if (deltaY >= 0) {
                        var leftHeight = DesObject.height() - deltaY;
                        if (leftHeight >= 8) {
                            PipeY++;
                        }
                    } else {
                        PipeY++;
                    }
                } else {
                    if (deltaY < 0) {
                        var leftHeight = DesObject.height() + deltaY;
                        if (leftHeight >= 8) {
                            PipeY++;
                        }
                    } else {
                        PipeY++;
                    }
                }
            }
        } else {
            PipeX++;
            PipeY++;
        }
    });
    if (PipeNeed == PipeX) {
        GlobalParameters.AdjustWBObject.children().filter("div[data-type='Interface']").each(function () {
            var Interface = $(this);
            var IConnect = Interface.attr("data-iconnect");
            if (IConnect != "") {
                var IDArray = IConnect.split("#");
                var DesObject = $("#" + IDArray[0]);
                var DesInterface = DesObject.children().filter("div[data-inumber='" + IDArray[1] + "']");
                var IType = DesInterface.data("itype");
                if (IType == "InterfaceLine11Left") {
                    if (deltaX >= 0) {
                        DesObject.css({
                            "left": "+=" + deltaX + "px",
                            "width": "-=" + deltaX + "px",
                        });
                    } else {
                        DesObject.css({
                            "left": "-=" + Math.abs(deltaX) + "px",
                            "width": "+=" + Math.abs(deltaX) + "px",
                        });
                    }
                } else {
                    if (deltaX >= 0) {
                        DesObject.css({
                            "width": "+=" + deltaX + "px",
                        });
                    } else {
                        DesObject.css({
                            "width": "-=" + Math.abs(deltaX) + "px",
                        });
                    }
                }
            }
        });
        if (deltaX >= 0) {
            GlobalParameters.AdjustWBObject.css({
                "left": "+=" + deltaX + "px",
            });
        } else {
            GlobalParameters.AdjustWBObject.css({
                "left": "-=" + Math.abs(deltaX) + "px",
            });
        }
    } else if (PipeNeed == PipeY) {
        GlobalParameters.AdjustWBObject.children().filter("div[data-type='Interface']").each(function () {
            var Interface = $(this);
            var IConnect = Interface.attr("data-iconnect");
            if (IConnect != "") {
                var IDArray = IConnect.split("#");
                var DesObject = $("#" + IDArray[0]);
                var DesInterface = DesObject.children().filter("div[data-inumber='" + IDArray[1] + "']");
                var IType = DesInterface.data("itype");
                if (IType == "InterfaceLine12Up") {
                    if (deltaX >= 0) {
                        DesObject.css({
                            "top": "+=" + deltaY + "px",
                            "height": "-=" + deltaY + "px",
                        });
                    } else {
                        DesObject.css({
                            "top": "-=" + Math.abs(deltaY) + "px",
                            "height": "+=" + Math.abs(deltaY) + "px",
                        });
                    }
                } else {
                    if (deltaY >= 0) {
                        DesObject.css({
                            "height": "+=" + deltaY + "px",
                        });
                    } else {
                        DesObject.css({
                            "height": "-=" + Math.abs(deltaY) + "px",
                        });
                    }
                }
            }
        });
        if (deltaY >= 0) {
            GlobalParameters.AdjustWBObject.css({
                "top": "+=" + deltaY + "px",
            });
        } else {
            GlobalParameters.AdjustWBObject.css({
                "top": "-=" + Math.abs(deltaY) + "px",
            });
        }
    } else {
        ShowTip("已达极限值，无法移动！");
        SetSystemSate(0);
    }
}
function DocMMSSCase4(e) {
    var SourceX = GlobalParameters.SourceWireInterface.offset().left - DocEle.Workbench.offset().left;
    var SourceY = GlobalParameters.SourceWireInterface.offset().top - DocEle.Workbench.offset().top;
    var DesX = e.pageX - DocEle.Workbench.offset().left;
    var DesY = e.pageY - DocEle.Workbench.offset().top;
    $("#ID_Point").css({
        "left": parseInt(DesX) + "px",
        "top": parseInt(DesY) + "px",
    });
    ShowOrHide(true, $("#ID_Point"));
    switch (GlobalParameters.SourceWireInterface.data("itype")) {
        case "InterfaceLine11Left":
            if (DesX > SourceX) {
                Wire[0].css({
                    "width": DesX - SourceX + "px",
                    "height": "1px",
                    "left": SourceX + "px",
                    "top": SourceY + "px",
                });
                ShowOrHide(true, Wire[0]);
            } else if (DesX < SourceX) {
                Wire[0].css({
                    "width": SourceX - DesX + "px",
                    "height": "1px",
                    "left": DesX + "px",
                    "top": SourceY + "px",
                });
                ShowOrHide(true, Wire[0]);
            } else {
                Wire[0].css({
                    "width": "0px",
                    "height": "0px",
                    "left": "0px",
                    "top": "0px",
                });
                ShowOrHide(false, Wire[0]);
            }
            if (DesY > SourceY) {
                Wire[1].css({
                    "width": "1px",
                    "height": DesY - SourceY + "px",
                    "left": DesX + "px",
                    "top": SourceY + "px",
                });
                ShowOrHide(true, Wire[1]);
            } else if (DesY < SourceY) {
                Wire[1].css({
                    "width": "1px",
                    "height": SourceY - DesY + "px",
                    "left": DesX + "px",
                    "top": DesY + "px",
                });
                ShowOrHide(true, Wire[1]);
            } else {
                Wire[1].css({
                    "width": "0px",
                    "height": "0px",
                    "left": "0px",
                    "top": "0px",
                });
                ShowOrHide(false, Wire[1]);
            }
            break;
        case "InterfaceLine11Right":
            if (DesX > SourceX) {
                Wire[0].css({
                    "width": DesX - SourceX + "px",
                    "height": "1px",
                    "left": SourceX + "px",
                    "top": SourceY + "px",
                });
                ShowOrHide(true, Wire[0]);
            } else if (DesX < SourceX) {
                Wire[0].css({
                    "width": SourceX - DesX + "px",
                    "height": "1px",
                    "left": DesX + "px",
                    "top": SourceY + "px",
                });
                ShowOrHide(true, Wire[0]);
            } else {
                Wire[0].css({
                    "width": "0px",
                    "height": "0px",
                    "left": "0px",
                    "top": "0px",
                });
                ShowOrHide(false, Wire[0]);
            }
            if (DesY > SourceY) {
                Wire[1].css({
                    "width": "1px",
                    "height": DesY - SourceY + "px",
                    "left": DesX + "px",
                    "top": SourceY + "px",
                });
                ShowOrHide(true, Wire[1]);
            } else if (DesY < SourceY) {
                Wire[1].css({
                    "width": "1px",
                    "height": SourceY - DesY + "px",
                    "left": DesX + "px",
                    "top": DesY + "px",
                });
                ShowOrHide(true, Wire[1]);
            } else {
                Wire[1].css({
                    "width": "0px",
                    "height": "0px",
                    "left": "0px",
                    "top": "0px",
                });
                ShowOrHide(false, Wire[1]);
            }
            break;
        case "InterfaceLine12Up":
            if (DesX > SourceX) {
                Wire[0].css({
                    "width": DesX - SourceX + "px",
                    "height": "1px",
                    "left": SourceX + "px",
                    "top": DesY + "px",
                });
                ShowOrHide(true, Wire[0]);
            } else if (DesX < SourceX) {
                Wire[0].css({
                    "width": SourceX - DesX + "px",
                    "height": "1px",
                    "left": DesX + "px",
                    "top": DesY + "px",
                });
                ShowOrHide(true, Wire[0]);
            } else {
                Wire[0].css({
                    "width": "0px",
                    "height": "0px",
                    "left": "0px",
                    "top": "0px",
                });
                ShowOrHide(false, Wire[0]);
            }
            if (DesY > SourceY) {
                Wire[1].css({
                    "width": "1px",
                    "height": DesY - SourceY + "px",
                    "left": SourceX + "px",
                    "top": SourceY + "px",
                });
                ShowOrHide(true, Wire[1]);
            } else if (DesY < SourceY) {
                Wire[1].css({
                    "width": "1px",
                    "height": SourceY - DesY + "px",
                    "left": SourceX + "px",
                    "top": DesY + "px",
                });
                ShowOrHide(true, Wire[1]);
            } else {
                Wire[1].css({
                    "width": "0px",
                    "height": "0px",
                    "left": "0px",
                    "top": "0px",
                });
                ShowOrHide(false, Wire[1]);
            }
            break;
        case "InterfaceLine12Down":
            if (DesX > SourceX) {
                Wire[0].css({
                    "width": DesX - SourceX + "px",
                    "height": "1px",
                    "left": SourceX + "px",
                    "top": DesY + "px",
                });
                ShowOrHide(true, Wire[0]);
            } else if (DesX < SourceX) {
                Wire[0].css({
                    "width": SourceX - DesX + "px",
                    "height": "1px",
                    "left": DesX + "px",
                    "top": DesY + "px",
                });
                ShowOrHide(true, Wire[0]);
            } else {
                Wire[0].css({
                    "width": "0px",
                    "height": "0px",
                    "left": "0px",
                    "top": "0px",
                });
                ShowOrHide(false, Wire[0]);
            }
            if (DesY > SourceY) {
                Wire[1].css({
                    "width": "1px",
                    "height": DesY - SourceY + "px",
                    "left": SourceX + "px",
                    "top": SourceY + "px",
                });
                ShowOrHide(true, Wire[1]);
            } else if (DesY < SourceY) {
                Wire[1].css({
                    "width": "1px",
                    "height": SourceY - DesY + "px",
                    "left": SourceX + "px",
                    "top": DesY + "px",
                });
                ShowOrHide(true, Wire[1]);
            } else {
                Wire[1].css({
                    "width": "0px",
                    "height": "0px",
                    "left": "0px",
                    "top": "0px",
                });
                ShowOrHide(false, Wire[1]);
            }
            break;
        default: break;
    }
    for (var i = 0; i < AllInterface.length; i++) {
        if (AllInterface[i].length > 0) {
            for (var j = 0; j < AllInterface[i].length; j++) {
                var DIStructure = AllInterface[i][j];
                if (GlobalParameters.SourceWireInterface.parent().attr("id") != DIStructure[0].parent().attr("id")) {
                    // only for unattached target interface.
                    if (DIStructure[0].attr("data-iconnect") == "") {
                        if (!IsPipe(DIStructure[0].parent().data("name"))) {
                            // Source Interface OffsetLeft OffsetTop Width Height.
                            var SILeft = e.pageX;
                            var SITop = e.pageY;
                            var SIWidth = 1;
                            var SIHeight = 1;
                            // Destination Interface OffsetLeft OffsetTop Width Height.
                            var DILeft = DIStructure[0].offset().left;
                            var DITop = DIStructure[0].offset().top;
                            var DIWidth = DIStructure[0].width();
                            var DIHeight = DIStructure[0].height();
                            // Distance that between the left-top corner of the two interfaces.
                            var Distance = GetDistance(SILeft, SITop, DILeft, DITop);
                            if (Distance <= GlobalParameters.DefaultPCD) {
                                // flag: 'true' for changing nearest interface, 'false' for not changing.
                                var IsChange = true;
                                if (WireCInfo[0]) {
                                    if (IsSameInterface(WireCInfo[1], DIStructure[0])) {
                                        IsChange = false;
                                    }
                                }
                                if (IsChange) {
                                    if (WireCInfo[2] > Distance) {
                                        if (WireCInfo[1] != null) {
                                            AddOrRemoveClass(false, WireCInfo[1], "IPreConnect");
                                        }
                                        WireCInfo[1] = DIStructure[0];
                                        WireCInfo[2] = Distance;
                                        AddOrRemoveClass(true, DIStructure[0], "IPreConnect");
                                        var Rect = new Array();
                                        if (SILeft > DILeft) {
                                            Rect[0] = DILeft;
                                        } else {
                                            Rect[0] = SILeft;
                                        }
                                        if (SITop > DITop) {
                                            Rect[1] = DITop;
                                        } else {
                                            Rect[1] = SITop;
                                        }
                                        if ((SILeft + parseInt(SIWidth)) > (DILeft + parseInt(DIWidth))) {
                                            Rect[2] = SILeft + parseInt(SIWidth);
                                        } else {
                                            Rect[2] = DILeft + parseInt(DIWidth);
                                        }
                                        if ((SITop + parseInt(SIHeight)) > (DITop + parseInt(DIHeight))) {
                                            Rect[3] = SITop + parseInt(SIHeight);
                                        } else {
                                            Rect[3] = DITop + parseInt(DIHeight);
                                        }
                                        CRect[0].css({
                                            "width": (Rect[2] - Rect[0]) + "px",
                                            "height": (Rect[3] - Rect[1] - 1) + "px",
                                            "left": (Rect[0] - DocEle.Workbench.offset().left - 1) + "px",
                                            "top": (Rect[1] - DocEle.Workbench.offset().top) + "px",
                                        });
                                        if (!WireCInfo[0]) {
                                            WireCInfo[0] = true;
                                        }
                                        ShowOrHide(true, CRect[0]);
                                    }
                                } else {
                                    WireCInfo[2] = Distance;
                                    var Rect = new Array();
                                    if (SILeft > DILeft) {
                                        Rect[0] = DILeft;
                                    } else {
                                        Rect[0] = SILeft;
                                    }
                                    if (SITop > DITop) {
                                        Rect[1] = DITop;
                                    } else {
                                        Rect[1] = SITop;
                                    }
                                    if ((SILeft + parseInt(SIWidth)) > (DILeft + parseInt(DIWidth))) {
                                        Rect[2] = SILeft + parseInt(SIWidth);
                                    } else {
                                        Rect[2] = DILeft + parseInt(DIWidth);
                                    }
                                    if ((SITop + parseInt(SIHeight)) > (DITop + parseInt(DIHeight))) {
                                        Rect[3] = SITop + parseInt(SIHeight);
                                    } else {
                                        Rect[3] = DITop + parseInt(DIHeight);
                                    }
                                    CRect[0].css({
                                        "width": (Rect[2] - Rect[0]) + "px",
                                        "height": (Rect[3] - Rect[1] - 1) + "px",
                                        "left": (Rect[0] - DocEle.Workbench.offset().left - 1) + "px",
                                        "top": (Rect[1] - DocEle.Workbench.offset().top) + "px",
                                    });
                                }
                            } else {
                                if (WireCInfo[0]) {
                                    if (IsSameInterface(WireCInfo[1], DIStructure[0])) {
                                        WireCInfo[0] = false;
                                        ShowOrHide(false, CRect[0]);
                                        AddOrRemoveClass(false, DIStructure[0], "IPreConnect");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// Detail Panel Functions.
function ClearDetailPanel() {
    DetailEle.DetailID.text("-");
    DetailEle.DetailType.text("-");
    DetailEle.DetailPosition.text("-");
    DetailEle.DetailComment.text("-");
    DetailEle.DetailInterface.text("-");
    DetailEle.DetailWeight.text("-");
    DetailEle.DetailSpeed.text("-");
    ClearDetailInterfaceList();
    AddOrRemoveClass(true, DetailEle.DetailIDPanel, "DetailEleGrey");
    AddOrRemoveClass(true, DetailEle.DetailTypePanel, "DetailEleGrey");
    AddOrRemoveClass(true, DetailEle.DetailPositionPanel, "DetailEleGrey");
    AddOrRemoveClass(true, DetailEle.DetailCommentPanel, "DetailEleGrey");
    AddOrRemoveClass(true, DetailEle.DetailInterfacePanel, "DetailEleGrey");
    AddOrRemoveClass(true, DetailEle.DetailWeightPanel, "DetailEleGrey");
    AddOrRemoveClass(true, DetailEle.DetailSpeedPanel, "DetailEleGrey");
    AddOrRemoveClass(false, DetailEle.DetailIChooseBox, "DetailEnableChoose");
}
function ClearDetailInterfaceList() {
    DetailEle.DetailInterfaceList.empty();
    DetailEle.DetailInterfaceList.css("height", "0px");
    ShowOrHide(false, DetailEle.DetailInterfaceList);
    DetailEle.DetailIChooseBox.text("接口#?");
}
function SetDetailPanel(Handle) {//将所选控件的属性显示在上方栏上
    //SetDetailPanel_SetID(Handle.attr("id"));//拖拽时生成的唯一id,这里隐藏。
    SetDetailPanel_SetType(Handle.data("name"));
    SetDetailPanel_SetPosition(Handle.offset().left - DocEle.Workbench.offset().left, Handle.offset().top - DocEle.Workbench.offset().top);
    SetDetailPanel_SetComment(Handle.attr("data-comment"));
    SetDetailPanel_SetInterface(Handle);
    if (typeof (Handle.attr("data-weight")) != "undefined") {
        SetDetailPanel_SetWeight(Handle.attr("data-weight"));
    }
    else if (typeof (Handle.attr("data-speed")) != "undefined") {
        SetDetailPanel_SetSpeed(Handle.attr("data-speed"));
    }
}
 function SetDetailPanel_SetID(Text) {
 DetailEle.DetailID.text(Text);
 AddOrRemoveClass(false, DetailEle.DetailIDPanel, "DetailEleGrey");
}
function SetDetailPanel_SetType(Text) {
    DetailEle.DetailType.text(Text);
    AddOrRemoveClass(false, DetailEle.DetailTypePanel, "DetailEleGrey");
}
function SetDetailPanel_SetPosition(PosX, PosY) {
    DetailEle.DetailPosition.text("(" + parseInt(PosX) + "," + parseInt(PosY) + ")");
    AddOrRemoveClass(false, DetailEle.DetailPositionPanel, "DetailEleGrey");
}
function SetDetailPanel_SetComment(Text) {
    if (Text == "") {
        Text = "-";
    }
    DetailEle.DetailComment.text(Text);
    AddOrRemoveClass(false, DetailEle.DetailCommentPanel, "DetailEleGrey");
}
function SetDetailPanel_SetInterface(Handle) {
    AddOrRemoveClass(false, DetailEle.DetailInterfacePanel, "DetailEleGrey");
    AddOrRemoveClass(true, DetailEle.DetailIChooseBox, "DetailEnableChoose");
    Handle.children().filter("div[data-type='Interface']").each(function () {
        var Object = $(this);
        DetailEle.DetailInterfaceList.css("height", parseInt(DetailEle.DetailInterfaceList.height() + 18) + "px");
        var DetailInterfaceLi = $("<div></div");
        AddOrRemoveClass(true, DetailInterfaceLi, "DetailInterfaceLi");
        DetailInterfaceLi.attr("data-value", Object.attr("data-iconnect"));
        DetailInterfaceLi.text("接口#" + Object.data("inumber").substring(1, 2));
        DetailInterfaceLi.click(DetailInterfaceLiClick);
        DetailInterfaceLi.appendTo(DetailEle.DetailInterfaceList);
    });
}
function SetDetailPanel_SetWeight(Text) {
    if (Text == "") {
        Text = "-";
    }
    DetailEle.DetailWeight.text(Text);
    AddOrRemoveClass(false, DetailEle.DetailWeightPanel, "DetailEleGrey");
}
function SetDetailPanel_SetSpeed(Text) {
    if (Text == "") {
        Text = "-";
    }
    DetailEle.DetailSpeed.text(Text);
    AddOrRemoveClass(false, DetailEle.DetailSpeedPanel, "DetailEleGrey");
}

// Satisfy Interfaces When Moving Objects.
function SetInterface(SIArray) {
    for (var i = 0; i < SIArray.length; i++) {
        // Source Interface Structure.
        var SIStructure = SIArray[i];
        SetInterface_SUI(SIStructure, i);
    }
}
// SetInterface SubFunction SetUnattachInterface.
function SetInterface_SUI(SIStructure, InterfaceIndex) {
    var ITypeIndex = parseInt(SetInterface_GMITI(SIStructure[0].data("itype")));
    if (AllInterface[ITypeIndex].length > 0) {
        for (var j = 0; j < AllInterface[ITypeIndex].length; j++) {
            // Destination Interface Structure.
            var DIStructure = AllInterface[ITypeIndex][j];
            if (SIStructure[0].parent().attr("id") != DIStructure[0].parent().attr("id")) {
                // only for unattached target interface.
                if (DIStructure[0].attr("data-iconnect") == "") {
                    // flag for controlling object being connected by pine.
                    var isRightType = false;
                    // Source Object Name.
                    var SOName = SIStructure[0].parent().data("name");
                    // Destination Object Name.
                    var DOName = DIStructure[0].parent().data("name");
                    // pine can be only connected to object, vice versa.
                    if (SOName == "line11" || SOName == "line12") {
                        if (DOName != "line11" && DOName != "line12") {
                            isRightType = true;
                        }
                    } else {
                        if (DOName == "line11" || DOName == "line12") {
                            isRightType = true;
                        }
                    }
                    if (isRightType) {
                        // Source Interface OffsetLeft OffsetTop Width Height.
                        var SILeft = SIStructure[0].offset().left;
                        var SITop = SIStructure[0].offset().top;
                        var SIWidth = SIStructure[0].width();
                        var SIHeight = SIStructure[0].height();
                        // Destination Interface OffsetLeft OffsetTop Width Height.
                        var DILeft = DIStructure[0].offset().left;
                        var DITop = DIStructure[0].offset().top;
                        var DIWidth = DIStructure[0].width();
                        var DIHeight = DIStructure[0].height();
                        // Distance that between the left-top corner of the two interfaces.
                        var Distance = GetDistance(SILeft, SITop, DILeft, DITop);
                        if (Distance <= GlobalParameters.DefaultPCD) {
                            // flag: 'true' for changing nearest interface, 'false' for not changing.
                            var IsChange = true;
                            if (ICInfo[InterfaceIndex][0]) {
                                if (IsSameInterface(ICInfo[InterfaceIndex][1], DIStructure[0])) {
                                    IsChange = false;
                                }
                            }
                            if (IsChange) {
                                if (ICInfo[InterfaceIndex][2] > Distance) {
                                    if (ICInfo[InterfaceIndex][1] != null) {
                                        AddOrRemoveClass(false, ICInfo[InterfaceIndex][1], "IPreConnect");
                                    }
                                    ICInfo[InterfaceIndex][1] = DIStructure[0];
                                    ICInfo[InterfaceIndex][2] = Distance;
                                    AddOrRemoveClass(true, SIStructure[0], "IPreConnect");
                                    AddOrRemoveClass(true, DIStructure[0], "IPreConnect");
                                    var Rect = new Array();
                                    if (SILeft > DILeft) {
                                        Rect[0] = DILeft;
                                    } else {
                                        Rect[0] = SILeft;
                                    }
                                    if (SITop > DITop) {
                                        Rect[1] = DITop;
                                    } else {
                                        Rect[1] = SITop;
                                    }
                                    if ((SILeft + parseInt(SIWidth)) > (DILeft + parseInt(DIWidth))) {
                                        Rect[2] = SILeft + parseInt(SIWidth);
                                    } else {
                                        Rect[2] = DILeft + parseInt(DIWidth);
                                    }
                                    if ((SITop + parseInt(SIHeight)) > (DITop + parseInt(DIHeight))) {
                                        Rect[3] = SITop + parseInt(SIHeight);
                                    } else {
                                        Rect[3] = DITop + parseInt(DIHeight);
                                    }
                                    CRect[InterfaceIndex].css({
                                        "width": (Rect[2] - Rect[0]) + "px",
                                        "height": (Rect[3] - Rect[1] - 1) + "px",
                                        "left": (Rect[0] - DocEle.Workbench.offset().left - 1) + "px",
                                        "top": (Rect[1] - DocEle.Workbench.offset().top) + "px",
                                    });
                                    if (!ICInfo[InterfaceIndex][0]) {
                                        ICInfo[InterfaceIndex][0] = true;
                                    }
                                    ShowOrHide(true, CRect[InterfaceIndex]);
                                }
                            } else {
                                ICInfo[InterfaceIndex][2] = Distance;
                                var Rect = new Array();
                                if (SILeft > DILeft) {
                                    Rect[0] = DILeft;
                                } else {
                                    Rect[0] = SILeft;
                                }
                                if (SITop > DITop) {
                                    Rect[1] = DITop;
                                } else {
                                    Rect[1] = SITop;
                                }
                                if ((SILeft + parseInt(SIWidth)) > (DILeft + parseInt(DIWidth))) {
                                    Rect[2] = SILeft + parseInt(SIWidth);
                                } else {
                                    Rect[2] = DILeft + parseInt(DIWidth);
                                }
                                if ((SITop + parseInt(SIHeight)) > (DITop + parseInt(DIHeight))) {
                                    Rect[3] = SITop + parseInt(SIHeight);
                                } else {
                                    Rect[3] = DITop + parseInt(DIHeight);
                                }
                                CRect[InterfaceIndex].css({
                                    "width": (Rect[2] - Rect[0]) + "px",
                                    "height": (Rect[3] - Rect[1] - 1) + "px",
                                    "left": (Rect[0] - DocEle.Workbench.offset().left - 1) + "px",
                                    "top": (Rect[1] - DocEle.Workbench.offset().top) + "px",
                                });
                            }
                        } else {
                            if (ICInfo[InterfaceIndex][0]) {
                                if (IsSameInterface(ICInfo[InterfaceIndex][1], DIStructure[0])) {
                                    ICInfo[InterfaceIndex][0] = false;
                                    ShowOrHide(false, CRect[InterfaceIndex]);
                                    AddOrRemoveClass(false, DIStructure[0], "IPreConnect");
                                    AddOrRemoveClass(false, SIStructure[0], "IPreConnect");
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
// SetInterface SubFunction GetMappingInterfaceTypeIndex.
function SetInterface_GMITI(IType) {
    switch (IType) {
        case "InterfaceLine11Left":
            return 1;
            break;
        case "InterfaceLine11Right":
            return 0;
            break;
        case "InterfaceLine12Up":
            return 3;
            break;
        case "InterfaceLine12Down":
            return 2;
            break;
        default:
            return 0;
            break;
    }
}
// SetInterface SubFunction GetBelongToInterfaceTypeIndex.
function SetInterface_GBTITI(IType) {
    switch (IType) {
        case "InterfaceLine11Left":
            return 0;
            break;
        case "InterfaceLine11Right":
            return 1;
            break;
        case "InterfaceLine12Up":
            return 2;
            break;
        case "InterfaceLine12Down":
            return 3;
            break;
        default:
            return 0;
            break;
    }
}

// Clear Now Chosen.
function ClearNowChosen() {
    if (NowChosen.isChosen) {
        AddOrRemoveClass(false, NowChosen.Handle, NowChosen.ClassName);
        NowChosen.Handle = null;
        NowChosen.ClassName = "";
        NowChosen.isChosen = false;
        ClearDetailPanel();
    }
}
// Set Now Chosen.
function SetNowChosen(Handle, ClassName) {
    NowChosen.Handle = Handle;
    NowChosen.ClassName = ClassName;
    NowChosen.isChosen = true;
    AddOrRemoveClass(true, NowChosen.Handle, NowChosen.ClassName);
    SetDetailPanel(NowChosen.Handle);
}

// Is In DIV By Position.
function IsInDIVByPos(SDiv, LDiv) {
    // Small DIV OffsetLeft OffsetTop Width Height.
    var SDOffsetLeft = SDiv.offset().left;
    var SDOffsetTop = SDiv.offset().top;
    var SDWidth = SDiv.width();
    var SDHeight = SDiv.height();
    // Large DIV OffsetLeft OffsetTop Width Height.
    var LDOffsetLeft = LDiv.offset().left;
    var LDOffsetTop = LDiv.offset().top;
    var LDWidth = LDiv.width();
    var LDHeight = LDiv.height();
    // return: 'true' for in, 'false' for out.
    if (SDOffsetLeft > LDOffsetLeft && (SDOffsetLeft + SDWidth) < (LDOffsetLeft + LDWidth) && SDOffsetTop > LDOffsetTop && (SDOffsetTop + SDHeight) < (LDOffsetTop + LDHeight)) {
        return true;
    } else {
        return false;
    }
}

// Add Or Remove A Class.
function AddOrRemoveClass(flag, Handle, ClassName) {  //当鼠标拖拽到工作台上时，添加class
    // flag: 'true' for add, 'false' for remove.
    if (flag) {
        if (!Handle.hasClass(ClassName))//hasClass() 方法检查被选元素是否包含指定的 class。
             {
            Handle.addClass(ClassName);
        }
    } else {
        if (Handle.hasClass(ClassName)) {
            Handle.removeClass(ClassName);
        }
    }
}
// Show Or Hide An Element.
function ShowOrHide(flag, Handle) {
    // flag: 'true' for show, 'false' for hide.
    if (flag) {
        if (Handle.is(":hidden")) {
            Handle.show();
        }
    } else {
        if (Handle.is(":visible")) {
            Handle.hide();
        }
    }
}

// Get Distance Between Two Points.
function GetDistance(X1, Y1, X2, Y2) {
    var Distance = (X1 - X2) * (X1 - X2) + (Y1 - Y2) * (Y1 - Y2);
    return Distance;
}

// Detail Panel Interface Choose Box Click.
function DetailIChooseBoxClick() {
    if (!DetailEle.DetailIChooseBox.parent().hasClass("DetailEleGrey")) {
        ShowOrHide(!DetailEle.DetailInterfaceList.is(":visible"), DetailEle.DetailInterfaceList);
    }
}
// Detail Panel Interface List Click.
function DetailInterfaceLiClick() {
    DetailEle.DetailIChooseBox.text($(this).text());
    var Value = $(this).data("value");
    if (Value == "") {
        DetailEle.DetailInterface.text("-");
    } else {
        DetailEle.DetailInterface.text(Value);
    }
    ShowOrHide(false, DetailEle.DetailInterfaceList);
}

// Satisfy User Interface When Scaling.
function SatisfyUI() {
    var WindowWidth = parseInt($(window).width());
    var WindowHeight = parseInt($(window).height());
    if (WindowWidth <= 1280) {
        $("#ID_Root").css({
            "width": "1246px",
        });
        $("#ID_RootContainer").css({
            "width": "1246px",
        });
        $("#ID_StatePanel").css({
            "width": "1086px",
        });
        $("#ID_DetailContainer").css({
            "width": "926px",
        });
        $("#ID_WorkbenchPanel").css({
            "width": "1086px",
        });
        $("#ID_ProgressBar").css({
            "width": "1040px",
            "margin-left": "-520px",
        });
    } else {
        $("#ID_Root").css({
            "width": WindowWidth - 34 + "px",
        });
        $("#ID_RootContainer").css({
            "width": WindowWidth - 34 + "px",
        });
        $("#ID_StatePanel").css({
            "width": WindowWidth - 194 + "px",
        });
        $("#ID_DetailContainer").css({
            "width": WindowWidth - 354 + "px",
        });
        $("#ID_WorkbenchPanel").css({
            "width": WindowWidth - 194 + "px",
        });
        $("#ID_ProgressBar").css({
            "width": WindowWidth - 240 + "px",
            "margin-left": -parseInt((WindowWidth - 240) / 2) + "px",
        });
    }
    if (WindowHeight <= 640) {
        $("#ID_Root").css({
            "height": "623px",
        });
        $("#ID_RootContainer").css({
            "height": "600px",
        });
        $('#ID_TemplatePanel').css({
            "height": "550px",
        });
        $("#ID_WorkbenchPanel").css({
            "height": "550px",
        });
        $("#ID_PageFoot").css({
            "top": "617px",
        });
    } else {
        $("#ID_Root").css({
            "height": WindowHeight - 17 + "px",
        });
        $("#ID_RootContainer").css({
            "height": WindowHeight - 40 + "px",
        });
        $('#ID_TemplatePanel').css({
            "height": WindowHeight - 90 + "px",
        });
        $("#ID_WorkbenchPanel").css({
            "height": WindowHeight - 90 + "px",
        });
        $("#ID_PageFoot").css({
            "top": WindowHeight - 23 + "px",
        });
    }
   // console.log(DocEle.TemplatePanel.css("height"));
    //console.log(WindowHeight);
}

// Loading Circle.
function Loading() {
    var LoadingText = DocEle.LoadingText.text();
    if (isLoading) {
        switch (LoadingText) {
            case "·":
                DocEle.LoadingText.text("· ·");
                break;
            case "· ·":
                DocEle.LoadingText.text("· · ·");
                break;
            case "· · ·":
                DocEle.LoadingText.text("· · · ·");
                break;
            case "· · · ·":
                DocEle.LoadingText.text("· · · · ·");
                break;
            case "· · · · ·":
                DocEle.LoadingText.text("· · · · · ·");
                break;
            case "· · · · · ·":
                DocEle.LoadingText.text("·");
                break;
        }
        setTimeout(Loading, 500);
    } else {
        if (loadingTimes < 6) {
            switch (LoadingText) {
                case "·":
                    DocEle.LoadingText.text("· ·");
                    break;
                case "· ·":
                    DocEle.LoadingText.text("· · ·");
                    break;
                case "· · ·":
                    DocEle.LoadingText.text("· · · ·");
                    break;
                case "· · · ·":
                    DocEle.LoadingText.text("· · · · ·");
                    break;
                case "· · · · ·":
                    DocEle.LoadingText.text("· · · · · ·");
                    break;
                case "· · · · · ·":
                    DocEle.LoadingText.text("·");
                    break;
            }
            setTimeout(Loading, 500);
        } else {
            CancelLoading();
        }
    }
    loadingTimes++;
}
// Cancel Loading Circle.
function CancelLoading() {
    DocEle.LoadingContainer.animate({
        opacity: "0",
    }, 300, function () {
        ShowOrHide(false, DocEle.LoadingContainer);
    });
}

// Workbench Expand Shrink Button Click.
function WorkbenchExpandUpClick(){
    // expand workbench.
    SatisfyESHeight(DocEle.Workbench, true, false, false);
    // satisfy each Workbench Object.
    DocEle.Workbench.children().each(function () {
        var PT = $(this);
        SatisfyESTop(PT, true, false);
    });
    // expand workbench corner.
    SatisfyESTop(DocEle.WorkbenchCornerLD, true, false);
    SatisfyESTop(DocEle.WorkbenchCornerRD, true, false);
    // expand workbench edge.
    SatisfyESHeight(DocEle.WorkbenchEdgeLeft, true, false, false);
    SatisfyESHeight(DocEle.WorkbenchEdgeRight, true, false, false);
    SatisfyESTop(DocEle.WorkbenchEdgeDown, true, false);
    // expand workbench expand and shrink button.
    SatisfyESHeight(DocEle.WorkbenchExpandLeft, true, true, true);
    SatisfyESHeight(DocEle.WorkbenchShrinkLeft, true, true, true);
    SatisfyESHeight(DocEle.WorkbenchExpandRight, true, true, true);
    SatisfyESHeight(DocEle.WorkbenchShrinkRight, true, true, true);
    SatisfyESTop(DocEle.WorkbenchShrinkLeft, true, true);
    SatisfyESTop(DocEle.WorkbenchShrinkRight, true, true);
    SatisfyESTop(DocEle.WorkbenchExpandDown, true, false);
    SatisfyESTop(DocEle.WorkbenchShrinkDown, true, false);
    DocEle.WorkbenchPanel.resize();
}
function WorkbenchExpandDownClick() {
    // expand workbench.
    SatisfyESHeight(DocEle.Workbench, true, false, false);
    // expand workbench corner.
    SatisfyESTop(DocEle.WorkbenchCornerLD, true, false);
    SatisfyESTop(DocEle.WorkbenchCornerRD, true, false);
    // expand workbench edge.
    SatisfyESHeight(DocEle.WorkbenchEdgeLeft, true, false, false);
    SatisfyESHeight(DocEle.WorkbenchEdgeRight, true, false, false);
    SatisfyESTop(DocEle.WorkbenchEdgeDown, true, false);
    // expand workbench expand and shrink button.
    SatisfyESHeight(DocEle.WorkbenchExpandLeft, true, true, true);
    SatisfyESHeight(DocEle.WorkbenchShrinkLeft, true, true, true);
    SatisfyESHeight(DocEle.WorkbenchExpandRight, true, true, true);
    SatisfyESHeight(DocEle.WorkbenchShrinkRight, true, true, true);
    SatisfyESTop(DocEle.WorkbenchShrinkLeft, true, true);
    SatisfyESTop(DocEle.WorkbenchShrinkRight, true, true);
    SatisfyESTop(DocEle.WorkbenchExpandDown, true, false);
    SatisfyESTop(DocEle.WorkbenchShrinkDown, true, false);
    DocEle.WorkbenchPanel.resize();
}
function WorkbenchExpandLeftClick() {
    // expand workbench.
    SatisfyESWidth(DocEle.Workbench, true, false);
    // satisfy each Workbench Object.
    DocEle.Workbench.children().each(function () {
        var PT = $(this);
        SatisfyESLeft(PT, true, false);
    });
    // expand workbench corner.
    SatisfyESLeft(DocEle.WorkbenchCornerRU, true, false);
    SatisfyESLeft(DocEle.WorkbenchCornerRD, true, false);
    // expand workbench edge.
    SatisfyESWidth(DocEle.WorkbenchEdgeUp, true, false);
    SatisfyESWidth(DocEle.WorkbenchEdgeDown, true, false);
    SatisfyESLeft(DocEle.WorkbenchEdgeRight, true, false);
    // expand workbench expand and shrink button.
    SatisfyESWidth(DocEle.WorkbenchExpandUp, true, true);
    SatisfyESWidth(DocEle.WorkbenchShrinkUp, true, true);
    SatisfyESWidth(DocEle.WorkbenchExpandDown, true, true);
    SatisfyESWidth(DocEle.WorkbenchShrinkDown, true, true);
    SatisfyESLeft(DocEle.WorkbenchShrinkUp, true, true);
    SatisfyESLeft(DocEle.WorkbenchShrinkDown, true, true);
    SatisfyESLeft(DocEle.WorkbenchExpandRight, true, false);
    SatisfyESLeft(DocEle.WorkbenchShrinkRight, true, false);
    DocEle.WorkbenchPanel.resize();
}
function WorkbenchExpandRightClick() {
    // expand workbench.
    SatisfyESWidth(DocEle.Workbench, true, false);
    // expand workbench corner.
    SatisfyESLeft(DocEle.WorkbenchCornerRU, true, false);
    SatisfyESLeft(DocEle.WorkbenchCornerRD, true, false);
    // expand workbench edge.
    SatisfyESWidth(DocEle.WorkbenchEdgeUp, true, false);
    SatisfyESWidth(DocEle.WorkbenchEdgeDown, true, false);
    SatisfyESLeft(DocEle.WorkbenchEdgeRight, true, false);
    // expand workbench expand and shrink button.
    SatisfyESWidth(DocEle.WorkbenchExpandUp, true, true);
    SatisfyESWidth(DocEle.WorkbenchShrinkUp, true, true);
    SatisfyESWidth(DocEle.WorkbenchExpandDown, true, true);
    SatisfyESWidth(DocEle.WorkbenchShrinkDown, true, true);
    SatisfyESLeft(DocEle.WorkbenchShrinkUp, true, true);
    SatisfyESLeft(DocEle.WorkbenchShrinkDown, true, true);
    SatisfyESLeft(DocEle.WorkbenchExpandRight, true, false);
    SatisfyESLeft(DocEle.WorkbenchShrinkRight, true, false);
    DocEle.WorkbenchPanel.resize();
}
function WorkbenchShrinkUpClick() {
    var WBHeight = DocEle.Workbench.height();
    if (WBHeight < 650) {
        ShowTip("工作台高度已经是最小值！");
    } else {
        // flag: 'true' for having <DefaultESD, 'false' for shrink ready.
        var flag = false;
        DocEle.Workbench.children().each(function () {
            if (!flag) {
                var PT = $(this);
                var Top = PT.position().top;
                if (Top < GlobalParameters.DefaultESD) {
                    flag = true;
                }
            }
        });
        if(flag){
            ShowTip("边缘物体处于收缩值内！");
        } else {
            // satisfy each Workbench Object.
            DocEle.Workbench.children().each(function () {
                var PT = $(this);
                SatisfyESTop(PT, false, false);
            });
            // shrink workbench.
            SatisfyESHeight(DocEle.Workbench, false, false, false);
            // shrink workbench corner.
            SatisfyESTop(DocEle.WorkbenchCornerLD, false, false);
            SatisfyESTop(DocEle.WorkbenchCornerRD, false, false);
            // shrink workbench edge.
            SatisfyESHeight(DocEle.WorkbenchEdgeLeft, false, false, false);
            SatisfyESHeight(DocEle.WorkbenchEdgeRight, false, false, false);
            SatisfyESTop(DocEle.WorkbenchEdgeDown, false, false);
            // shrink workbench expand and shrink button.
            SatisfyESHeight(DocEle.WorkbenchExpandLeft, false, true, true);
            SatisfyESHeight(DocEle.WorkbenchShrinkLeft, false, true, true);
            SatisfyESHeight(DocEle.WorkbenchExpandRight, false, true, true);
            SatisfyESHeight(DocEle.WorkbenchShrinkRight, false, true, true);
            SatisfyESTop(DocEle.WorkbenchShrinkLeft, false, true);
            SatisfyESTop(DocEle.WorkbenchShrinkRight, false, true);
            SatisfyESTop(DocEle.WorkbenchExpandDown, false, false);
            SatisfyESTop(DocEle.WorkbenchShrinkDown, false, false);
            DocEle.WorkbenchPanel.resize();
        }
    }
}
function WorkbenchShrinkDownClick() {
    var WBHeight = DocEle.Workbench.height();
    if (WBHeight < 650) {
        ShowTip("工作台高度已经是最小值！");
    } else {
        // flag: 'true' for having <DefaultESD, 'false' for shrink ready.
        var flag = false;
        DocEle.Workbench.children().each(function () {
            if (!flag) {
                var PT = $(this);
                var Bottom = PT.position().top + PT.height();
                if (Bottom > (WBHeight - GlobalParameters.DefaultESD)) {
                    flag = true;
                }
            }
        });
        if (flag) {
            ShowTip("边缘物体处于收缩值内！");
        } else {
            // shrink workbench.
            SatisfyESHeight(DocEle.Workbench, false, false, false);
            // shrink workbench corner.
            SatisfyESTop(DocEle.WorkbenchCornerLD, false, false);
            SatisfyESTop(DocEle.WorkbenchCornerRD, false, false);
            // shrink workbench edge.
            SatisfyESHeight(DocEle.WorkbenchEdgeLeft, false, false, false);
            SatisfyESHeight(DocEle.WorkbenchEdgeRight, false, false, false);
            SatisfyESTop(DocEle.WorkbenchEdgeDown, false, false);
            // shrink workbench expand and shrink button.
            SatisfyESHeight(DocEle.WorkbenchExpandLeft, false, true, true);
            SatisfyESHeight(DocEle.WorkbenchShrinkLeft, false, true, true);
            SatisfyESHeight(DocEle.WorkbenchExpandRight, false, true, true);
            SatisfyESHeight(DocEle.WorkbenchShrinkRight, false, true, true);
            SatisfyESTop(DocEle.WorkbenchShrinkLeft, false, true);
            SatisfyESTop(DocEle.WorkbenchShrinkRight, false, true);
            SatisfyESTop(DocEle.WorkbenchExpandDown, false, false);
            SatisfyESTop(DocEle.WorkbenchShrinkDown, false, false);
            DocEle.WorkbenchPanel.resize();
        }
    }
}
function WorkbenchShrinkLeftClick() {
    var WBWidth = DocEle.Workbench.width();
    if (WBWidth < 1170) {
        ShowTip("工作台长度已经是最小值！");
    } else {
        // flag: 'true' for having <DefaultESD, 'false' for shrink ready.
        var flag = false;
        DocEle.Workbench.children().each(function () {
            if (!flag) {
                var PT = $(this);
                var Left = PT.position().left;
                if (Left < GlobalParameters.DefaultESD) {
                    flag = true;
                }
            }
        });
        if (flag) {
            ShowTip("边缘物体处于收缩值内！");
        } else {
            // satisfy each Workbench Object.
            DocEle.Workbench.children().each(function () {
                var PT = $(this);
                SatisfyESLeft(PT, false, false);
            });
            // shrink workbench.
            SatisfyESWidth(DocEle.Workbench, false, false);
            // shrink workbench corner.
            SatisfyESLeft(DocEle.WorkbenchCornerRU, false, false);
            SatisfyESLeft(DocEle.WorkbenchCornerRD, false, false);
            // shrink workbench edge.
            SatisfyESWidth(DocEle.WorkbenchEdgeUp, false, false);
            SatisfyESWidth(DocEle.WorkbenchEdgeDown, false, false);
            SatisfyESLeft(DocEle.WorkbenchEdgeRight, false, false);
            // shrink workbench expand and shrink button.
            SatisfyESWidth(DocEle.WorkbenchExpandUp, false, true);
            SatisfyESWidth(DocEle.WorkbenchShrinkUp, false, true);
            SatisfyESWidth(DocEle.WorkbenchExpandDown, false, true);
            SatisfyESWidth(DocEle.WorkbenchShrinkDown, false, true);
            SatisfyESLeft(DocEle.WorkbenchShrinkUp, false, true);
            SatisfyESLeft(DocEle.WorkbenchShrinkDown, false, true);
            SatisfyESLeft(DocEle.WorkbenchExpandRight, false, false);
            SatisfyESLeft(DocEle.WorkbenchShrinkRight, false, false);
            DocEle.WorkbenchPanel.resize();
        }
    }
}
function WorkbenchShrinkRightClick() {
    var WBWidth = DocEle.Workbench.width();
    if (WBWidth < 1170) {
        ShowTip("工作台长度已经是最小值！");
    } else {
        // flag: 'true' for having <DefaultESD, 'false' for shrink ready.
        var flag = false;
        DocEle.Workbench.children().each(function () {
            if (!flag) {
                var PT = $(this);
                var Right = PT.position().left + PT.width();
                if (Right > (WBWidth - GlobalParameters.DefaultESD)) {
                    flag = true;
                }
            }
        });
        if (flag) {
            ShowTip("边缘物体处于收缩值内！");
        } else {
            // shrink workbench.
            SatisfyESWidth(DocEle.Workbench, false, false);
            // shrink workbench corner.
            SatisfyESLeft(DocEle.WorkbenchCornerRU, false, false);
            SatisfyESLeft(DocEle.WorkbenchCornerRD, false, false);
            // shrink workbench edge.
            SatisfyESWidth(DocEle.WorkbenchEdgeUp, false, false);
            SatisfyESWidth(DocEle.WorkbenchEdgeDown, false, false);
            SatisfyESLeft(DocEle.WorkbenchEdgeRight, false, false);
            // shrink workbench expand and shrink button.
            SatisfyESWidth(DocEle.WorkbenchExpandUp, false, true);
            SatisfyESWidth(DocEle.WorkbenchShrinkUp, false, true);
            SatisfyESWidth(DocEle.WorkbenchExpandDown, false, true);
            SatisfyESWidth(DocEle.WorkbenchShrinkDown, false, true);
            SatisfyESLeft(DocEle.WorkbenchShrinkUp, false, true);
            SatisfyESLeft(DocEle.WorkbenchShrinkDown, false, true);
            SatisfyESLeft(DocEle.WorkbenchExpandRight, false, false);
            SatisfyESLeft(DocEle.WorkbenchShrinkRight, false, false);
            DocEle.WorkbenchPanel.resize();
        }
    }
}

// Satisfy Expand Shrink Height.
function SatisfyESHeight(Handle, flagES, flagHalf, flagLH) {
    var ESD; // Expand Shrink Distance.
    // flagHalf: 'true' for DefaultESDHalf, 'false' for DefaultESD.
    if (flagHalf) {
        ESD = GlobalParameters.DefaultESDHalf;
    } else {
        ESD = GlobalParameters.DefaultESD;
    }
    // flagES: 'true' for expand, 'false' for shrink.
    // flagLH: 'true' for line-height.
    if (flagES) {
        Handle.css({
            "height": "+=" + ESD + "px",
        });
        if (flagLH) {
            Handle.css({
                "line-height": "+=" + ESD + "px",
            });
        }
    } else {
        Handle.css({
            "height": "-=" + ESD + "px",
        });
        if (flagLH) {
            Handle.css({
                "line-height": "-=" + ESD + "px",
            });
        }
    }
}
// Satisfy Expand Shrink Top.
function SatisfyESTop(Handle, flagES, flagHalf) {
    var ESD; // Expand Shrink Distance.
    // flagHalf: 'true' for DefaultESDHalf, 'false' for DefaultESD.
    if (flagHalf) {
        ESD = GlobalParameters.DefaultESDHalf;
    } else {
        ESD = GlobalParameters.DefaultESD;
    }
    // flagES: 'true' for expand, 'false' for shrink.
    if (flagES) {
        Handle.css({
            "top": "+=" + ESD + "px",
        });
    } else {
        Handle.css({
            "top": "-=" + ESD + "px",
        });
    }
}
// Satisfy Expand Shrink Width.
function SatisfyESWidth(Handle, flagES, flagHalf) {
    var ESD; // Expand Shrink Distance.
    // flagHalf: 'true' for DefaultESDHalf, 'false' for DefaultESD.
    if (flagHalf) {
        ESD = GlobalParameters.DefaultESDHalf;
    } else {
        ESD = GlobalParameters.DefaultESD;
    }
    // flagES: 'true' for expand, 'false' for shrink.
    if (flagES) {
        Handle.css({
            "width": "+=" + ESD + "px",
        });
    } else {
        Handle.css({
            "width": "-=" + ESD + "px",
        });
    }
}
// Satisfy Expand Shrink Top.
function SatisfyESLeft(Handle, flagES, flagHalf) {
    var ESD; // Expand Shrink Distance.
    // flagHalf: 'true' for DefaultESDHalf, 'false' for DefaultESD.
    if (flagHalf) {
        ESD = GlobalParameters.DefaultESDHalf;
    } else {
        ESD = GlobalParameters.DefaultESD;
    }
    // flagES: 'true' for expand, 'false' for shrink.
    if (flagES) {
        Handle.css({
            "left": "+=" + ESD + "px",
        });
    } else {
        Handle.css({
            "left": "-=" + ESD + "px",
        });
    }
}

// Is Connect A Object.
function IsConnectAObject(ID, SID) {
    var Handle = $("#" + ID);
    if (!IsPipe(Handle.data("name"))) {
        if (GlobalParameters.isMovingAlone) {
            GlobalParameters.isMovingAlone = false;
        }
    } else {
        Handle.children().filter("div[data-type='Interface']").each(function () {
            var Interface = $(this);
            var IConnect = Interface.attr("data-iconnect");
            if (IConnect != "") {
                var IDArray = IConnect.split("#");
                if (IDArray[0] != SID) {
                    IsConnectAObject(IDArray[0], ID);
                }
            }
        });
    }
}
// Is Pipe.
function IsPipe(Name) {
    switch (Name) {
        case "line11":
        case "line12":
        case "convert11":
        case "convert12":
        case "convert13":
        case "convert14":
        case "convert21":
        case "convert22":
        case "convert23":
        case "convert24":
            return true;
            break;
        default:
            return false;
            break;
    }
}
// Satisfy Moving Alone.
function SatisfyMovingAlone(ID, SID) {
    var Handle = $("#" + ID);
    GlobalParameters.MovingWBObject.push(Handle);
    Handle.children().filter("div[data-type='Interface']").each(function () {
        var Interface = $(this);
        var IConnect = Interface.attr("data-iconnect");
        if (IConnect != "") {
            var IDArray = IConnect.split("#");
            if (IDArray[0] != SID) {
                SatisfyMovingAlone(IDArray[0], ID);
            }
        } else {
            var NewInterface = new Array();
            NewInterface[0] = Interface;
            NewInterface[1] = null;
            MovingInterface.push(NewInterface);
            var ICInfoSub = [false, null, 9999];
            ICInfo.push(ICInfoSub);
        }
    });
}
// Is Same Interface.
function IsSameInterface(SI, DI) {
    var SPID = SI.parent().attr("id");
    var DPID = DI.parent().attr("id");
    var SIN = SI.data("inumber");
    var DIN = DI.data("inumber");
    if (SPID == DPID && SIN == DIN) {
        return true;
    } else {
        return false;
    }
}

// Check Connection If It Can Be Connected.
function CheckConnection() {
    var SILeft = GlobalParameters.SourceWireInterface.offset().left;
    var SITop = GlobalParameters.SourceWireInterface.offset().top;
    var DILeft = WireCInfo[1].offset().left;
    var DITop = WireCInfo[1].offset().top;
    var SourceIType = GlobalParameters.SourceWireInterface.data("itype");
    var DesIType = WireCInfo[1].data("itype");
    switch (SourceIType) {
        case "InterfaceLine11Left":
            switch (DesIType) {
                case "InterfaceLine11Left":
                    return false;
                    break;
                case "InterfaceLine11Right":
                    if (Math.abs(DITop - SITop) >= 20) {
                        if ((SILeft - DILeft) >= 26) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if (DITop == SITop && (SILeft - DILeft) >= 4) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                case "InterfaceLine12Up":
                    if ((DITop - SITop >= 14)) {
                        if ((SILeft - DILeft) >= 14) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if ((SILeft - DILeft) >= 34) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                case "InterfaceLine12Down":
                    if ((SITop - DITop >= 14)) {
                        if ((SILeft - DILeft) >= 14) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if ((SILeft - DILeft) >= 36) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                default:
                    return false;
                    break;
            }
            break;
        case "InterfaceLine11Right":
            switch (DesIType) {
                case "InterfaceLine11Left":
                    if (Math.abs(DITop - SITop) >= 20) {
                        if ((DILeft - SILeft) >= 26) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if (DITop == SITop && (DILeft - SILeft) >= 4) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                case "InterfaceLine11Right":
                    return false;
                    break;
                case "InterfaceLine12Up":
                    if ((DITop - SITop >= 14)) {
                        if ((DILeft - SILeft) >= 16) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if ((DILeft - SILeft) >= 34) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                case "InterfaceLine12Down":
                    if ((SITop - DITop >= 14)) {
                        if ((DILeft - SILeft) >= 16) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if ((DILeft - SILeft) >= 34) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                default:
                    return false;
                    break;
            }
            break;
        case "InterfaceLine12Up":
            switch (DesIType) {
                case "InterfaceLine11Left":
                    if ((DILeft - SILeft >= 14)) {
                        if ((SITop - DITop) >= 14) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if ((SITop - DITop) >= 34) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                case "InterfaceLine11Right":
                    if ((SILeft - DILeft >= 14)) {
                        if ((SITop - DITop) >= 14) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if ((SITop - DITop) >= 34) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                case "InterfaceLine12Up":
                    return false;
                    break;
                case "InterfaceLine12Down":
                    if (Math.abs(SILeft - DILeft) >= 20) {
                        if ((SITop - DITop) >= 26) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if (SILeft == DILeft && (SITop - DITop) >= 4) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                default:
                    return false;
                    break;
            }
            break;
        case "InterfaceLine12Down":
            switch (DesIType) {
                case "InterfaceLine11Left":
                    if ((DILeft - SILeft >= 14)) {
                        if ((DITop - SITop) >= 14) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if ((DITop - SITop) >= 34) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                case "InterfaceLine11Right":
                    if ((SILeft - DILeft >= 14)) {
                        if ((DITop - SITop) >= 14) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if ((DITop - SITop) >= 34) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                case "InterfaceLine12Up":
                    if (Math.abs(SILeft - DILeft) >= 20) {
                        if ((DITop - SITop) >= 26) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if (SILeft == DILeft && (DITop - SITop) >= 4) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    break;
                case "InterfaceLine12Down":
                    return false;
                    break;
                default:
                    return false;
                    break;
            }
            break;
        default:
            return false;
            break;
    }
}
// Auto Create Connection.
function AutoCreateConnection() {
    var SILeft = GlobalParameters.SourceWireInterface.offset().left;
    var SITop = GlobalParameters.SourceWireInterface.offset().top;
    var DILeft = WireCInfo[1].offset().left;
    var DITop = WireCInfo[1].offset().top;
    var SourceIType = GlobalParameters.SourceWireInterface.data("itype");
    var DesIType = WireCInfo[1].data("itype");
    var NextInterface = new Array();
    switch (SourceIType) {
        case "InterfaceLine11Left":
            switch (DesIType) {
                case "InterfaceLine11Right":
                    if (SITop == DITop) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I2", SILeft - DILeft + 2, 0);
                        SetTwoIBinding(NextInterface[0], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(SILeft - DILeft);
                        var EveryLineX = [8, 8];
                        for (var i = 26; i < Whole; i++) {
                            if (EveryLineX[0] <= EveryLineX[1]) {
                                EveryLineX[0]++;
                            } else {
                                EveryLineX[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I2", EveryLineX[0], 0);
                        if (SITop > DITop) {
                            NextInterface[1] = CreateBindingObject(NextInterface[0], "convert24", "I1", 0, 0);
                            NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I2", 0, SITop - DITop - 12);
                            NextInterface[3] = CreateBindingObject(NextInterface[2], "convert22", "I2", 0, 0);
                        } else {
                            NextInterface[1] = CreateBindingObject(NextInterface[0], "convert21", "I2", 0, 0);
                            NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I1", 0, DITop - SITop - 12);
                            NextInterface[3] = CreateBindingObject(NextInterface[2], "convert23", "I1", 0, 0);
                        }
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line11", "I2", EveryLineX[1], 0);
                        SetTwoIBinding(NextInterface[4], WireCInfo[1]);
                    }
                    break;
                case "InterfaceLine12Up":
                    if ((DITop - SITop >= 14)) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I2", SILeft - DILeft - 6, 0);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert21", "I2", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I1", 0, DITop - SITop - 6);
                        SetTwoIBinding(NextInterface[2], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(SILeft - DILeft);
                        var EveryLineX = [8, 8];
                        for (var i = 34; i < Whole; i++) {
                            if (EveryLineX[0] <= EveryLineX[1]) {
                                EveryLineX[0]++;
                            } else {
                                EveryLineX[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I2", EveryLineX[0], 0);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert24", "I1", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I2", 0, SITop - DITop + 24);
                        NextInterface[3] = CreateBindingObject(NextInterface[2], "convert22", "I2", 0, 0);
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line11", "I2", EveryLineX[1], 0);
                        NextInterface[5] = CreateBindingObject(NextInterface[4], "convert21", "I2", 0, 0);
                        NextInterface[6] = CreateBindingObject(NextInterface[5], "line12", "I1", 0, 30);
                        SetTwoIBinding(NextInterface[6], WireCInfo[1]);
                    }
                    break;
                case "InterfaceLine12Down":
                    if ((SITop - DITop >= 14)) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I2", SILeft - DILeft - 6, 0);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert24", "I1", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I2", 0, SITop - DITop - 4);
                        SetTwoIBinding(NextInterface[2], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(SILeft - DILeft);
                        var EveryLineX = [8, 8];
                        for (var i = 34; i < Whole; i++) {
                            if (EveryLineX[0] <= EveryLineX[1]) {
                                EveryLineX[0]++;
                            } else {
                                EveryLineX[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I2", EveryLineX[0], 0);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert21", "I2", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I1", 0, DITop - SITop + 22);
                        NextInterface[3] = CreateBindingObject(NextInterface[2], "convert23", "I1", 0, 0);
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line11", "I2", EveryLineX[1], 0);
                        NextInterface[5] = CreateBindingObject(NextInterface[4], "convert24", "I1", 0, 0);
                        NextInterface[6] = CreateBindingObject(NextInterface[5], "line12", "I2", 0, 30);
                        SetTwoIBinding(NextInterface[6], WireCInfo[1]);
                    }
                    break;
                default: break;
            }
            break;
        case "InterfaceLine11Right":
            switch (DesIType) {
                case "InterfaceLine11Left":
                    if (SITop == DITop) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I1", DILeft - SILeft + 2, 0);
                        SetTwoIBinding(NextInterface[0], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(DILeft - SILeft);
                        var EveryLineX = [8, 8];
                        for (var i = 26; i < Whole; i++) {
                            if (EveryLineX[0] <= EveryLineX[1]) {
                                EveryLineX[0]++;
                            } else {
                                EveryLineX[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I1", EveryLineX[0], 0);
                        if (SITop > DITop) {
                            NextInterface[1] = CreateBindingObject(NextInterface[0], "convert23", "I2", 0, 0);
                            NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I2", 0, SITop - DITop - 12);
                            NextInterface[3] = CreateBindingObject(NextInterface[2], "convert21", "I1", 0, 0);
                        } else {
                            NextInterface[1] = CreateBindingObject(NextInterface[0], "convert22", "I1", 0, 0);
                            NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I1", 0, DITop - SITop - 12);
                            NextInterface[3] = CreateBindingObject(NextInterface[2], "convert24", "I2", 0, 0);
                        }
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line11", "I1", EveryLineX[1], 0);
                        SetTwoIBinding(NextInterface[4], WireCInfo[1]);
                    }
                    break;
                case "InterfaceLine12Up":
                    if ((DITop - SITop >= 14)) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I1", DILeft - SILeft - 4, 0);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert22", "I1", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I1", 0, DITop - SITop - 4);
                        SetTwoIBinding(NextInterface[2], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(DILeft - SILeft + 2);
                        var EveryLineX = [8, 8];
                        for (var i = 34; i < Whole; i++) {
                            if (EveryLineX[0] <= EveryLineX[1]) {
                                EveryLineX[0]++;
                            } else {
                                EveryLineX[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I1", EveryLineX[0], 0);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert23", "I2", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I2", 0, SITop - DITop + 24);
                        NextInterface[3] = CreateBindingObject(NextInterface[2], "convert21", "I1", 0, 0);
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line11", "I1", EveryLineX[1], 0);
                        NextInterface[5] = CreateBindingObject(NextInterface[4], "convert22", "I1", 0, 0);
                        NextInterface[6] = CreateBindingObject(NextInterface[5], "line12", "I1", 0, 30);
                        SetTwoIBinding(NextInterface[6], WireCInfo[1]);
                    }
                    break;
                case "InterfaceLine12Down":
                    if ((SITop - DITop >= 14)) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I1", DILeft - SILeft - 4, 0);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert23", "I2", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I2", 0, SITop - DITop - 4);
                        SetTwoIBinding(NextInterface[2], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(DILeft - SILeft + 2);
                        var EveryLineX = [8, 8];
                        for (var i = 34; i < Whole; i++) {
                            if (EveryLineX[0] <= EveryLineX[1]) {
                                EveryLineX[0]++;
                            } else {
                                EveryLineX[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line11", "I1", EveryLineX[0], 0);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert22", "I1", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line12", "I1", 0, DITop - SITop + 22);
                        NextInterface[3] = CreateBindingObject(NextInterface[2], "convert24", "I2", 0, 0);
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line11", "I1", EveryLineX[1], 0);
                        NextInterface[5] = CreateBindingObject(NextInterface[4], "convert23", "I2", 0, 0);
                        NextInterface[6] = CreateBindingObject(NextInterface[5], "line12", "I2", 0, 30);
                        SetTwoIBinding(NextInterface[6], WireCInfo[1]);
                    }
                    break;
                default: break;
            }
            break;
        case "InterfaceLine12Up":
            switch(DesIType){
                case "InterfaceLine11Left":
                    if ((DILeft - SILeft >= 14)) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I2", 0, SITop - DITop - 6);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert21", "I1", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I1", DILeft - SILeft - 4, 0);
                        SetTwoIBinding(NextInterface[2], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(SITop - DITop);
                        var EveryLineY = [8, 8];
                        for (var i = 34; i < Whole; i++) {
                            if (EveryLineY[0] <= EveryLineY[1]) {
                                EveryLineY[0]++;
                            } else {
                                EveryLineY[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I2", 0, EveryLineY[0]);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert22", "I2", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I2", SILeft - DILeft + 22, 0);
                        NextInterface[3] = CreateBindingObject(NextInterface[2], "convert24", "I1", 0, 0);
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line12", "I2", 0, EveryLineY[1]);
                        NextInterface[5] = CreateBindingObject(NextInterface[4], "convert21", "I1", 0, 0);
                        NextInterface[6] = CreateBindingObject(NextInterface[5], "line11", "I1", 30, 0);
                        SetTwoIBinding(NextInterface[6], WireCInfo[1]);
                    }
                    break;
                case "InterfaceLine11Right":
                    if ((SILeft - DILeft >= 14)) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I2", 0, SITop - DITop - 6);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert22", "I2", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I2", SILeft - DILeft - 4, 0);
                        SetTwoIBinding(NextInterface[2], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(SITop - DITop);
                        var EveryLineY = [8, 8];
                        for (var i = 34; i < Whole; i++) {
                            if (EveryLineY[0] <= EveryLineY[1]) {
                                EveryLineY[0]++;
                            } else {
                                EveryLineY[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I2", 0, EveryLineY[0]);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert21", "I1", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I1", DILeft - SILeft + 22, 0);
                        NextInterface[3] = CreateBindingObject(NextInterface[2], "convert23", "I2", 0, 0);
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line12", "I2", 0, EveryLineY[1]);
                        NextInterface[5] = CreateBindingObject(NextInterface[4], "convert22", "I2", 0, 0);
                        NextInterface[6] = CreateBindingObject(NextInterface[5], "line11", "I2", 30, 0);
                        SetTwoIBinding(NextInterface[6], WireCInfo[1]);
                    }
                    break;
                case "InterfaceLine12Down":
                    if (DILeft == SILeft) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I2", 0, SITop - DITop + 2);
                        SetTwoIBinding(NextInterface[0], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(SITop - DITop);
                        var EveryLineY = [8, 8];
                        for (var i = 26; i < Whole; i++) {
                            if (EveryLineY[0] <= EveryLineY[1]) {
                                EveryLineY[0]++;
                            } else {
                                EveryLineY[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I2", 0, EveryLineY[0]);
                        if (DILeft > SILeft) {
                            NextInterface[1] = CreateBindingObject(NextInterface[0], "convert21", "I1", 0, 0);
                            NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I1", DILeft - SILeft - 12, 0);
                            NextInterface[3] = CreateBindingObject(NextInterface[2], "convert23", "I2", 0, 0);
                        } else {
                            NextInterface[1] = CreateBindingObject(NextInterface[0], "convert22", "I2", 0, 0);
                            NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I2", SILeft - DILeft - 12, 0);
                            NextInterface[3] = CreateBindingObject(NextInterface[2], "convert24", "I1", 0, 0);
                        }
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line12", "I2", 0, EveryLineY[1]);
                        SetTwoIBinding(NextInterface[4], WireCInfo[1]);
                    }
                    break;
                default: break;
            }
            break;
        case "InterfaceLine12Down":
            switch (DesIType) {
                case "InterfaceLine11Left":
                    if ((DILeft - SILeft >= 14)) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I1", 0, DITop - SITop - 4);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert24", "I2", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I1", DILeft - SILeft - 6, 0);
                        SetTwoIBinding(NextInterface[2], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(DITop - SITop);
                        var EveryLineY = [8, 8];
                        for (var i = 34; i < Whole; i++) {
                            if (EveryLineY[0] <= EveryLineY[1]) {
                                EveryLineY[0]++;
                            } else {
                                EveryLineY[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I1", 0, EveryLineY[0]);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert23", "I1", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I2", SILeft - DILeft + 22, 0);
                        NextInterface[3] = CreateBindingObject(NextInterface[2], "convert21", "I2", 0, 0);
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line12", "I1", 0, EveryLineY[1]);
                        NextInterface[5] = CreateBindingObject(NextInterface[4], "convert24", "I2", 0, 0);
                        NextInterface[6] = CreateBindingObject(NextInterface[5], "line11", "I1", 30, 0);
                        SetTwoIBinding(NextInterface[6], WireCInfo[1]);
                    }
                    break;
                case "InterfaceLine11Right":
                    if ((SILeft - DILeft >= 14)) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I1", 0, DITop - SITop - 4);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert23", "I1", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I2", SILeft - DILeft - 4, 0);
                        SetTwoIBinding(NextInterface[2], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(DITop - SITop + 2);
                        var EveryLineY = [8, 8];
                        for (var i = 34; i < Whole; i++) {
                            if (EveryLineY[0] <= EveryLineY[1]) {
                                EveryLineY[0]++;
                            } else {
                                EveryLineY[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I1", 0, EveryLineY[0]);
                        NextInterface[1] = CreateBindingObject(NextInterface[0], "convert24", "I2", 0, 0);
                        NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I1", DILeft - SILeft + 22, 0);
                        NextInterface[3] = CreateBindingObject(NextInterface[2], "convert22", "I1", 0, 0);
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line12", "I1", 0, EveryLineY[1]);
                        NextInterface[5] = CreateBindingObject(NextInterface[4], "convert23", "I1", 0, 0);
                        NextInterface[6] = CreateBindingObject(NextInterface[5], "line11", "I2", 30, 0);
                        SetTwoIBinding(NextInterface[6], WireCInfo[1]);
                    }
                    break;
                case "InterfaceLine12Up":
                    if (DILeft == SILeft) {
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I1", 0, DITop - SITop + 2);
                        SetTwoIBinding(NextInterface[0], WireCInfo[1]);
                    } else {
                        var Whole = parseInt(DITop - SITop);
                        var EveryLineY = [8, 8];
                        for (var i = 26; i < Whole; i++) {
                            if (EveryLineY[0] <= EveryLineY[1]) {
                                EveryLineY[0]++;
                            } else {
                                EveryLineY[1]++;
                            }
                        }
                        NextInterface[0] = CreateBindingObject(GlobalParameters.SourceWireInterface, "line12", "I1", 0, EveryLineY[0]);
                        if (DILeft > SILeft) {
                            NextInterface[1] = CreateBindingObject(NextInterface[0], "convert24", "I2", 0, 0);
                            NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I1", DILeft - SILeft - 12, 0);
                            NextInterface[3] = CreateBindingObject(NextInterface[2], "convert22", "I1", 0, 0);
                        } else {
                            NextInterface[1] = CreateBindingObject(NextInterface[0], "convert23", "I1", 0, 0);
                            NextInterface[2] = CreateBindingObject(NextInterface[1], "line11", "I2", SILeft - DILeft - 12, 0);
                            NextInterface[3] = CreateBindingObject(NextInterface[2], "convert21", "I2", 0, 0);
                        }
                        NextInterface[4] = CreateBindingObject(NextInterface[3], "line12", "I1", 0, EveryLineY[1]);
                        SetTwoIBinding(NextInterface[4], WireCInfo[1]);
                    }
                    break;
                default: break;
            }
            break;
        default: break;
    }
}
// Return The Unattach Interface Handle.
function CreateBindingObject(SourceInterface, DesName, DesINumber, DesWidth, DesHeight) {
    var Object = $("<div></div>");
    // ID: type + random 3 numbers
    var newID = DesName + parseInt(Math.random() * 9) + parseInt(Math.random() * 9) + parseInt(Math.random() * 9);
    var isNewID = true;
    while (isNewID) {
        if ($("#" + newID).length > 0) {
            newID = DesName + parseInt(Math.random() * 9) + parseInt(Math.random() * 9) + parseInt(Math.random() * 9);
        } else {
            isNewID = false;
        }
    }
    Object.attr("id", newID);
    Object.attr("data-name", DesName);
    Object.attr("data-type", "WorkbenchObject");
    Object.attr("data-comment", "");
    var InterfaceHandle = new Array();
    var InterfaceDescription = new Array();
    var InterfaceLength = 2;
    var ClassName = "";
    switch (Object.data("name")) {
        case "convert21":
            ClassName = "WorkbenchConvert21";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForConvert21I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForConvert21I2" }
            break;
        case "convert22":
            ClassName = "WorkbenchConvert22";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForConvert22I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForConvert22I2" }
            break;
        case "convert23":
            ClassName = "WorkbenchConvert23";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForConvert23I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForConvert23I2" }
            break;
        case "convert24":
            ClassName = "WorkbenchConvert24";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForConvert24I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForConvert24I2" }
            break;
        case "line11":
            ClassName = "WorkbenchLine11";
            InterfaceDescription[0] = { IType: "InterfaceLine11", IDirect: "Left", ISuffix: "ForLine11I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine11", IDirect: "Right", ISuffix: "ForLine11I2" }
            break;
        case "line12":
            ClassName = "WorkbenchLine12";
            InterfaceDescription[0] = { IType: "InterfaceLine12", IDirect: "Up", ISuffix: "ForLine12I1" }
            InterfaceDescription[1] = { IType: "InterfaceLine12", IDirect: "Down", ISuffix: "ForLine12I2" }
            break;
    }
    AddOrRemoveClass(true, Object, ClassName);
    var BindingInterface;
    var ReturnInterface;
    for (var i = 0; i < InterfaceLength; i++) {
        InterfaceHandle[i] = $("<div></div>");
        InterfaceHandle[i].attr("data-type", "Interface");
        InterfaceHandle[i].attr("data-iconnect", "");
        InterfaceHandle[i].attr("data-inumber", "I" + (i + 1));
        InterfaceHandle[i].attr("data-itype", InterfaceDescription[i].IType + InterfaceDescription[i].IDirect);
        InterfaceHandle[i].addClass(InterfaceDescription[i].IType);
        InterfaceHandle[i].addClass(InterfaceDescription[i].IType + InterfaceDescription[i].ISuffix);
        InterfaceHandle[i].appendTo(Object);
        if(InterfaceHandle[i].data("inumber") == DesINumber){
            BindingInterface = InterfaceHandle[i];
        }else{
            ReturnInterface = InterfaceHandle[i];
        }
        var Interface = new Array();
        Interface[0] = InterfaceHandle[i];
        Interface[1] = null;
        var Index = SetInterface_GBTITI(InterfaceDescription[i].IType + InterfaceDescription[i].IDirect);
        AllInterface[Index].push(Interface);
    }
    Object.appendTo(DocEle.Workbench);
    if (DesName == "line11") {
        Object.css({
            "width": DesWidth + "px",
        });

    } else if (DesName == "line12") {
        Object.css({
            "height": DesHeight + "px",
        });
    }

    var Left = SourceInterface.offset().left - DocEle.Workbench.offset().left - BindingInterface.position().left;
    var Top = SourceInterface.offset().top - DocEle.Workbench.offset().top - BindingInterface.position().top;
    Object.css({
        "left": Left + "px",
        "top": Top + "px",
    });
    // bind interfaces.
    BindingInterface.attr("data-iconnect", SourceInterface.parent().attr("id") + "#" + SourceInterface.data("inumber"));
    SourceInterface.attr("data-iconnect", BindingInterface.parent().attr("id") + "#" + BindingInterface.data("inumber"));
    var BindingIndex = SetInterface_GBTITI(BindingInterface.data("itype"));
    var SourceIndex = SetInterface_GBTITI(SourceInterface.data("itype"));
    for (var i = 0; i < AllInterface[BindingIndex].length; i++){
        if(IsSameInterface(BindingInterface, AllInterface[BindingIndex][i][0])){
            AllInterface[BindingIndex][i][1] = SourceInterface;
        }
    }
    for (var i = 0; i < AllInterface[SourceIndex].length; i++){
        if(IsSameInterface(SourceInterface, AllInterface[SourceIndex][i][0])){
            AllInterface[SourceIndex][i][1] = BindingInterface;
        }
    }
    AddOrRemoveClass(true, BindingInterface, "IConnected");
    AddOrRemoveClass(true, SourceInterface, "IConnected");
    return ReturnInterface;
}
// Set Two Interfaces Binded.
function SetTwoIBinding(I1, I2) {
    // bind interfaces.
    I2.attr("data-iconnect", I1.parent().attr("id") + "#" + I1.data("inumber"));
    I1.attr("data-iconnect", I2.parent().attr("id") + "#" + I2.data("inumber"));
    var I2Index = SetInterface_GBTITI(I2.data("itype"));
    var I1Index = SetInterface_GBTITI(I1.data("itype"));
    for (var i = 0; i < AllInterface[I2Index].length; i++) {
        if (IsSameInterface(I2, AllInterface[I2Index][i][0])) {
            AllInterface[I2Index][i][1] = I1;
        }
    }
    for (var i = 0; i < AllInterface[I1Index].length; i++) {
        if (IsSameInterface(I1, AllInterface[I1Index][i][0])) {
            AllInterface[I1Index][i][1] = I2;
        }
    }
    AddOrRemoveClass(true, I2, "IConnected");
    AddOrRemoveClass(true, I1, "IConnected");
}
//输入单元数后生成json的代码
//输入后生成请输入单元功能的数量。
//生成GUID
function guid() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
 function createClick() {
        var unit_count = $("#unit_count").val();// 获取input输入的数,定义变量unit_count为单元数
         var a = /^[0-9]*[1-9][0-9]*$/;
         var onlyid = guid();
        if(a.exec(unit_count)==null||unit_count==""){
             ShowTip("您输入的格式有误！");
             return;
          }
        UnitCount=unit_count;//赋值给全局变量，用于以后选择。
        shangweiji["project_id"]=onlyid;
         shangweiji["unit_sum"]=unit_count;
    for (var i=1;i<=unit_count;i++)
   {
     var uname = "u0"+i;
     var unit={
            "uname":uname,
			"controls":[],
            "function":[]
             };
      shangweiji.unit.push(unit);
     }
   // var jsonStr = JSON.stringify(shangweiji);
     for (var i=0;i<unit_count;i++){
         var unit_id = "u0"+(i+1);
         $('#UnitFunction').append("<li id="+unit_id+" onclick='unitfun(this)'>单元"+ (i+1) +"</li>");
         $('#'+unit_id).after(
             "<ul class='submenu' id="+unit_id+"ul><div class='checkbox'><label><input type='checkbox' id='"+unit_id +"_feed'  value='1' onclick='SelectFunction(this)'>定量加料</label></div><div class='checkbox'><label> <input type='checkbox' value='2' id='"+unit_id+"_drop' onclick='SelectFunction(this)'>定速滴加</label></div><div class='checkbox'><label><input type='checkbox' value='3' id='"+unit_id+"_outp' onclick='SelectFunction(this)' >定量出料</label></div> <div class='checkbox'><label><input type='checkbox' value='4' id='"+unit_id+"_temp' onclick='SelectFunction(this)'>过程温控</label></div><div class='checkbox'><label><input type='checkbox' value='5' id='"+unit_id+"_thal' onclick='SelectFunction(this)'> 高温报警</label> </div><div class='checkbox'><label><input type='checkbox' value='6' id='"+unit_id+"_reset' onclick='SelectFunction(this)'>复位</label></div><div class='checkbox'><label><input type='checkbox' value='7' id='"+unit_id+"_chk' onclick='SelectFunction(this)'>自检</label></div></ul>");
     }
     $('#unit_count').attr("disabled","ture");
     $('#create').attr("disabled","ture");
     $(Selectunit).each(function(index,data){
           UnitSelect(data);
     });//遍历数组，在几种弹窗的选择单元中建立option
    
     //alert(jsonStr);
    }
    function unitfun(w){
        var e= w.id;
        var eul=e+"ul";
     $('#'+eul).toggleClass("submenu1");
    }
    function SelectFunction(w) {
        var e = w.id;
        var earray = e.split("_");
       if($('#'+e).is(':checked')){
        //earray[0]是单元数，earray[1]是功能名
          //alert(earray[1]);
        switch (earray[1]){
            case "feed"://定量加料
            $('#ID_Poptype6').html("<p class='lable2' style='margin-top:6px'>定量加料</p>");
                //var a = MeteringTank.length;//计量罐数组的长度
                //alert(a);
               $('#MeterSelect').attr("id",e+"_M");
               $('#SwitchSelect').attr("id",e+"_I");
               ShowOrHide(true, DocEle.Popjialiao);
                EnterPop();break;
            case "drop"://定速滴加
            $('#ID_Poptype7').html("<p class='lable2' style='margin-top:6px'>定速滴加</p>");
               $('#MeterSelectD').attr("id",e+"_M");
               $('#AjustSelect').attr("id",e+"_I");
               ShowOrHide(true, DocEle.PopDrop);
                EnterPop();break;
            case"outp"://定量出料
            $('#ID_Poptype8').html("<p class='lable2' style='margin-top:6px'>定量出料</p>");
               $('#MeterSelectO').attr("id",e+"_M");
               $('#SwitchSelect1').attr("id",e+"_I");
               ShowOrHide(true, DocEle.Popoutp);
                EnterPop();break;
            case"temp"://复位 自检不需要弹窗
            $('#ID_Poptype9').html("<p class='lable2' style='margin-top:6px'>过程温控</p>");
               $("select[name='SensorSelect']").attr("id",e+"_S");
               ShowOrHide(true, DocEle.Poptemp);
                EnterPop();break;
            case"thal":
            $('#ID_Poptype9').html("<p class='lable2' style='margin-top:6px'>高温报警</p>");
               $("select[name='SensorSelect']").attr("id",e+"_S");
               ShowOrHide(true, DocEle.Poptemp);
                EnterPop();break;
            case"reset":
            var element = {
                   "Name":"reset_"+earray[0],
					"Text":"复位",
                    "Type":"reset"
            };
           for(var i=0;i<shangweiji.unit.length;i++){
                if(earray[0] == shangweiji.unit[i].uname){
                   var uarray = shangweiji.unit[i];
                   uarray.function.push(element);
                 break;
                 }
                if(i==shangweiji.unit.length-1){
                   ShowTip("您输入的名字与单元数不符！请检查后输入");
                    return;
                 }
            }
             //alert(JSON.stringify(shangweiji));
            break;
            case"chk":
            var element = {
                   "Name":"chk_"+earray[0],
					"Text":"自检",
                    "Type":"chk"
            };
           for(var i=0;i<shangweiji.unit.length;i++){
                if(earray[0] == shangweiji.unit[i].uname){
                   var uarray = shangweiji.unit[i];
                   uarray.function.push(element);
                 break;
                 }
                if(i==shangweiji.unit.length-1){
                   ShowTip("您输入的名字与单元数不符！请检查后输入");
                    return;
                 }
            }
            //alert(JSON.stringify(shangweiji));
            break;
           default:break;
        }
        return;
        }
            for(var i=0;i<shangweiji.unit.length;i++){
                if(earray[0]==shangweiji.unit[i].uname){
                   var uarray = shangweiji.unit[i].function;
                   jQuery.each(uarray,function(n,value){
                      if(value.Type==earray[1]){
                        uarray.splice(n,1);
                      }
                   });
                }
            }
           //alert(JSON.stringify(shangweiji));
    }
       //$('#jialiao').html("<div>请选择</div>");

    // function addClick(w){
    //     var e=w.id;
    //     switch(e){
    //         case add1:
    //         var a ="<select class='form-control' id='MeterSelect' name='MeterSelect'>";

    //     }

    // }
    function PopjialiaoCancelClick() {
    CancelPop();
    ShowOrHide(false, DocEle.Popjialiao);
    }
    function PopjialiaoConfirmClick() {//定量加料 定速滴加 定量出料的弹窗
         var meterid = $("select[name='MeterSelect']").attr("id");//获取计量罐的id
         var switchid = $("select[name='SwitchSelect']").attr("id");//获取阀门的id
         //feed 是定量加料,drop是 定速滴加，outp是定量出料
         var meterarray=meterid.split("_");//meterarray[0]是单元名，meterarray[1]是功能名.
         var SwicthValue=$("select[name='SwitchSelect']").val();
         var MeterValue=$("select[name='MeterSelect']").val();
         var Max = $('#max').val();
       // alert(meterarray[0]);
       // alert(SwicthValue[0]);
       var funname= "feed"+"_";
       var funname1=SwicthValue[0];
        for (var i=1;i<SwicthValue.length;i++){
          funname1 = funname1+"_"+SwicthValue[i];
       }
       var element = {
                   "Name":funname+funname1+"_"+Max,
					"Text":MeterValue+"定量加料",
                    "Type":"feed"

       };
        //alert(shangweiji.unit[0].uname);
         for(var i=0;i<shangweiji.unit.length;i++){
           if(meterarray[0] == shangweiji.unit[i].uname){
              var uarray = shangweiji.unit[i];
               uarray.function.push(element);
              break;
           }
        if(i==shangweiji.unit.length-1){
           ShowTip("您输入的名字与单元数不符！请检查后输入");
          return;
       }
      }
        $("#AlertSuccess").slideDown("slow");
        setTimeout("$('#AlertSuccess').slideUp('slow')",2000);
        // alert(JSON.stringify(shangweiji));

}
function PopDropConfirmClick(){
    var meterid = $("select[name='MeterSelectD']").attr("id");//获取计量罐的id
    var meterarray=meterid.split("_");//meterarray[0]是单元名，meterarray[1]是功能名.
    var AjustValue=$("select[name='AjustSelect']").val();
    var MeterValue=$("select[name='MeterSelectD']").val();
    var funname= "drop"+"_";
    var funname1=AjustValue[0];
        for (var i=1;i<AjustValue.length;i++){
          funname1 = funname1+"_"+AjustValue[i];
       }
     var element = {
                    "Name":funname+funname1,
					"Text":MeterValue+"定速滴加",
                    "Type":"drop"

       };
    for(var i=0;i<shangweiji.unit.length;i++){
           if(meterarray[0] == shangweiji.unit[i].uname){
              var uarray = shangweiji.unit[i];
               uarray.function.push(element);
              break;
           }
        if(i==shangweiji.unit.length-1){
           ShowTip("您输入的名字与单元数不符！请检查后输入");
          return;
       }
      }
        $("#AlertSuccess1").slideDown("slow");
        setTimeout("$('#AlertSuccess1').slideUp('slow')",2000);
        // alert(JSON.stringify(shangweiji));

}
function PopDropCancelClick() {
    CancelPop();
    ShowOrHide(false, DocEle.PopDrop);
}
function PopoutpConfirmClick(){
    var meterid = $("select[name='MeterSelectO']").attr("id");//获取计量罐的id
    var meterarray=meterid.split("_");//meterarray[0]是单元名，meterarray[1]是功能名.
    var SwitchValue=$("select[name='SwitchSelect1']").val();
    var MeterValue=$("select[name='MeterSelectO']").val();
    var funname= "outp"+"_";
    var funname1=SwitchValue[0];
        for (var i=1;i<SwitchValue.length;i++){
          funname1 = funname1+"_"+SwitchValue[i];
       }
     var element = {
                    "Name":funname+funname1,
					"Text":MeterValue+"定量出料",
                    "Type":"outp"

       };
    for(var i=0;i<shangweiji.unit.length;i++){
           if(meterarray[0] == shangweiji.unit[i].uname){
              var uarray = shangweiji.unit[i];
               uarray.function.push(element);
              break;
           }
        if(i==shangweiji.unit.length-1){
           ShowTip("您输入的名字与单元数不符！请检查后输入");
          return;
       }
      }
        $("#AlertSuccess2").slideDown("slow");
        setTimeout("$('#AlertSuccess2').slideUp('slow')",2000);
        // alert(JSON.stringify(shangweiji));

}
function PopoutpCancelClick() {
    CancelPop();
    ShowOrHide(false, DocEle.Popoutp);
}
function PoptempConfirmClick(){
    var sensorid = $("select[name='SensorSelect']").attr("id");//获取计量罐的id
    var sensorarray = sensorid.split("_");//sensorarray 是单元名，sensorarray 是功能名.
    var SensorValue=$("select[name='SensorSelect']").val();
    var funname=sensorarray[1] +"_"+SensorValue;
    //alert(sensorarray[1]);
   switch(sensorarray[1]){
    case"temp":
    var a="过程温控";break;
    case"thal":
    var a="高温报警";break;
    default:break;
   }
    var element = {
                    "Name":funname,
					"Text":a,
                    "Type":sensorarray[1]

       };
 for(var i=0;i<shangweiji.unit.length;i++){
           if(sensorarray[0] == shangweiji.unit[i].uname){
              var uarray = shangweiji.unit[i];
               uarray.function.push(element);
              break;
           }
        if(i==shangweiji.unit.length-1){
           ShowTip("您输入的名字与单元数不符！请检查后输入");
          return;
       }
      }
        $("#AlertSuccess3").slideDown("slow");
        setTimeout("$('#AlertSuccess3').slideUp('slow')",2000);
        //alert(JSON.stringify(shangweiji));
        ShowOrHide(false, DocEle.Poptemp);
        CancelPop();
}
function PoptempCancelClick(){
    CancelPop();
    ShowOrHide(false, DocEle.Poptemp);
}
// function UnitSelect(){
//     var Creatoption="<option value='01'>01单元</option>";
//     for(var i=2;i<=UnitCount;i++){
//         var ii = ("0"+i).substr(-2);
//         Creatoption=Creatoption+"<option value='"+ii+"'>"+ii+"单元</option>";
//     }
//     return Creatoption;
// }
function UnitSelect(SelectID){
    for(var i=1;i<=UnitCount;i++){
        var ii = ("0"+i).substr(-2);
        $('#'+SelectID).append("<option value='"+ii+"'>"+ii+"单元</option>");
    }
}
function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
