/*
 * Copyright (c) Ebeydulla Hesen ( Nurqut/FinalDream: nurqut@gmail.com )
 * Site:    http://www.nurqut.net
 * File:    NUIedit.js
 * Version: 0.6.3 (31/01/2014)
 * License: GPL
 */

!(function (window) {
	/* NUIedit config */
		var nuiStyleFont = 'Alkatip Basma Tom,Ukij Tuz Tom';
		var nuiId;

	/* replace uyghur characters */
	var uyghurChars = {
		"47":"1574",
		"63":"1567",/* ("?") */
		"44":"1548",/* (",") */
		"109":"1605",/* (m yaki M) */
		"77":"1605",
		"110":"1606",/* (n yaki N) */
		"78":"1606",
		"98":"1576",/* (b yaki B) */
		"66":"1576",
		"118":"1736",/* (v yaki V) */
		"86":"1736",
		"99":"1594",/* (c yaki C) */
		"67":"1594",
		"120":"1588",/* (x yaki X) */
		"88":"1588",
		"122":"1586",/* (z yaki Z) */
		"90":"1586",
		"97":"1726",/* (a yaki A) */
		"65":"1726",
		"115":"1587",/* (s yaki S) */
		"83":"1587",
		"100":"1583",/* ("d") */
		"68":"1688",/* ("D") */
		"102":"1575",/* ("f") */
		"70":"1601",/* ("F") */
		"103":"1749",/* ("g") */
		"71":"1711",/* ("G") */
		"104":"1609",/* ("h") */
		"72":"1582",/* ("H") */
		"106":"1602",/* ("j") */
		"74":"1580",/* ("J") */
		"107":"1603",/* ("k") */
		"75":"1734",/* ("K") */
		"108":"1604",/* (l yaki L) */
		"76":"1604",
		"59":"1563",/* (",") */
		"113":"1670",/* (q yaki Q) */
		"81":"1670",
		"119":"1739",/* (w yaki W) */
		"87":"1739",
		"101":"1744",/* (e yaki E) */
		"69":"1744",
		"114":"1585",/* (r yaki R) */
		"82":"1585",
		"116":"1578",/* ("t") */
		"84":"1600",/* ("T") */
		"121":"1610",/* (y yaki Y) */
		"89":"1610",
		"117":"1735",/* (u yaki U) */
		"85":"1735",
		"105":"1709",/* (i yaki I) */
		"73":"1709",
		"111":"1608",/* (o yaki O) */
		"79":"1608",
		"112":"1662",/* (p yaki P) */
		"80":"1662",
		"125":"171", /* (ong qosh tirnaq) */
		"123":"187"/* (sol qosh tirnaq) */
		/*  Add character here */
	};

	/* check browsers */
	var sysUA = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? sysUA.ie = s[1] :
	(ua.indexOf("trident") > -1 && ua.indexOf("rv") > -1) ? sysUA.ie11 = '11.0' :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sysUA.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sysUA.chrome = s[1] :
	(s = ua.match(/opera.([\d.]+)/)) ? sysUA.opera = s[1] :
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sysUA.safari = s[1] : 0;

	/* main function */
	/* for multiple iframe */
	function nuiKeyFunc(editor, editwin){
		editorID = nuiIdget(editor);
		for ( j = 0; j < editorID.length; j++ ) {
			nuiKeyFuncs(editorID, j);
		}
	}
	/* set keydown, keypress functions */
	function nuiKeyFuncs(obj, pos){
		nuiId = obj[pos];
		/* different actions for browsers */
		if (sysUA.ie){
			/* for IE */
			var editor = document.frames[nuiId].document;
			var editwin = document.frames[nuiId];
			/* event functions */
			editor.body.style.fontFamily=nuiStyleFont;
			editor.onkeypress=function(){
				var charCode=editwin.event.keyCode;
				if(editwin.title!=0){
					charCode = convertCharToUyghur(charCode);
					if(charCode!=0) editwin.event.keyCode=charCode;
				}
			};
			editor.onkeydown=function(){	
				var almash=editwin.event;
				if(almash.ctrlKey && almash.keyCode==75) editwin.title=editwin.title=="0"?"1":"0";
			};
		}else{
			/* for non-IE and IE11 */
			var editor = document.getElementById(nuiId);
			var editwin = null;
			editor = (editor.contentWindow) ? editor.contentWindow : (editor.contentDocument.document) ? editor.contentDocument.document : editor.contentDocument;
			editor.document.body.style.fontFamily=nuiStyleFont;
			editor.document.addEventListener("keypress",nuikeypress,false);
			editor.document.addEventListener("keydown", nuiKeydown, false);
			if(sysUA.chrome) { editor.document.addEventListener('DOMFocusIn', function(){ nuiId = obj[pos]; }, false); }
			else if (sysUA.ie11){ editor.document.addEventListener("click", function(){ nuiId = obj[pos]; }, false); }
			else { editor.document.addEventListener("focus", function(){ nuiId = obj[pos]; }, false); }
		}
	}
	/* replace function */
	function convertCharToUyghur(charStr) {
	    return uyghurChars[charStr] || charStr;
	}
	/* insert function */
	function insertTextAtCursor(text) {
	    var sel, range, textNode;
			var editor = document.getElementById(nuiId);
			editor = (editor.contentWindow) ? editor.contentWindow : (editor.contentDocument.document) ? editor.contentDocument.document : editor.contentDocument;
	    if (editor.getSelection) {
	        sel = editor.getSelection();
	        if (sel.getRangeAt && sel.rangeCount) {
	            range = sel.getRangeAt(0);
	            range.deleteContents();
		    textNode = editor.document.createTextNode(text);
	            range.insertNode(textNode);
	            /* Move caret to the end of the newly inserted text node */
	            range.setStart(textNode, textNode.length);
	            range.setEnd(textNode, textNode.length);
	            sel.removeAllRanges();
	            sel.addRange(range);			
				/* herp baghlashmasliqni hel qilish */
				if(!(sysUA.ie11 || sysUA.firefox)){
					textNode.parentNode.normalize();
				}
			}
	    } else if (document.selection && document.selection.createRange) {
	        range = document.selection.createRange();
	        range.pasteHTML(text);
	    }
	}
	/* keypres function */
	function nuikeypress(evt) {
		evt = evt || window.event;
		var charCode = (typeof evt.which == "undefined") ? evt.keyCode : evt.which;
		var almash = document.getElementById(nuiId);
		if (almash.title!="1" && charCode && !evt.ctrlKey && (typeof uyghurChars[charCode] !== "undefined")) {
			var charCode = convertCharToUyghur(charCode);
			var charStr = String.fromCharCode(charCode); 
			preventDefault(evt);
			insertTextAtCursor(charStr);
			return false;
		}
	}
	/* keydown function */
	function nuiKeydown(evt) {
		evt = evt || window.event;
		var charCode = (typeof evt.which == "undefined") ? evt.keyCode : evt.which;
		var almash = document.getElementById(nuiId);
		// tab
		if(charCode==9){
			evt.preventDefault();
			return false;
		}
		// K
		if(evt.ctrlKey && charCode==75){
			if(almash.title=="") { almash.title="0";}
			almash.title=almash.title=="0"?"1":"0";
			evt.preventDefault();
			return false;
		}
	}
	/* reset function */
	function preventDefault(evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		} else if (typeof evt.returnValue !== "undefined") {
			evt.returnValue = false;
		}
	}
	/* get iframe ids */
	function nuiIdget(nuiIds){
		var nuiIdsList;
		if ( typeof(nuiIds) != "undefined" && nuiIds && nuiIds.length != 0 ) {
			nuiIdsList = nuiIds.split ( ':' );
		} else {
			nuiIdsList = new Array();
		}
		nuiIdsn = new Array();
		var idno = 0;
		for ( j = 0; j < nuiIdsList.length; j++ ) {
			var frameobj = document.getElementById(nuiIdsList[j]);
			if (frameobj) {nuiIdsn[idno] = nuiIdsList[j]; idno++;}
		}
		return nuiIdsn;
	}
	
    // API function
    window.nuiKeyFunc = nuiKeyFunc;
}) (window);