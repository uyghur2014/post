<meta charset="utf-8">
<?php
$get=$_POST['content1'];

?>
<script type="text/javascript" src="parse-1.4.2.min.js"></script>
	<script charset="utf-8" src="jquery-2.1.3.min.js"></script>

<script type="text/javascript">
	
 var $id='<?php echo $get;?>';
 $id.val();
   

Parse.initialize("hSNY3qCUgP6jYeb3dwG53huAGGd8YEHugCAjdgGR", "YQweurkNQQi0ZUrWVEzWgRcmLAzYmg1WDU2v2Sry");

var TestObject = Parse.Object.extend("turlar");
var testObject = new TestObject();
testObject.save({desc: $id}).then(function(object) {
  alert("yay! it worked");
});
</script>