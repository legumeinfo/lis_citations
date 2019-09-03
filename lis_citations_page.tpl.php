<!-- Title and guide text  -->
<div>
  <h1>Citations for LIS </h1>
</div>

<!--
<?php 
  drupal_add_library('system', 'drupal.collapse');
?>
-->

<script  type="text/javascript"  src="/sites/all/modules/lis_citations/lis_citations.js"></script>

<script  type="text/javascript">
//var json_str = <?php echo $json_2005_str; ?>;
//var obj = JSON.parse(json_str);
//console.log(json_str);
var url_2005 = <?php  echo json_encode($url_2005_citations); ?>;
var pmids_2005 = <?php  echo json_encode($pmids_2005); ?>;
//var pmids_2016 = <?php  //echo json_encode($pmids_lis_2016); ?>;

var pmid_lis_2016 = <?php  echo json_encode($pmid_lis_2016); ?>;
var pmid_lis_2005 = <?php  echo json_encode($pmid_lis_2005); ?>;
console.log(pmid_lis_2016);
//Default display:
FillDomElementWithCitedinHtml (pmid_lis_2016 + ',' + pmid_lis_2005,'div1');

</script>

<!--  DELETE LATER
<button  onclick="/*alert(json_str);*/ /*alert(obj);*/ alert(json_str.linksets[0].linksetdbs[0].links);" >alert 2005 IDs</button>
<button  onclick="showPubmedIds (div1, url_2005)"  >Show pubmed Ids in div1 (invalid)</button>
-->
<!--
<button  onclick="listCitingPubmedIds (15608283)"  >List Citing PubmedI Articles in div2</button>
-->
<!--
<button  onclick="FillDomElementWithCitedinHtml (pmid_lis_2005,'div1')"  >2005 paper: Show citations in div1</button>
<button  onclick="FillDomElementWithCitedinHtml (pmid_lis_2016,'div1')"  >2016 paper: Show citations in div1</button>
<button  onclick="FillDomElementWithCitedinHtml (pmid_lis_2016 + ',' + pmid_lis_2005,'div1'); /*this.style.backgroundColor='#99ccff';*/ ">2005 & 2016 papers: Show citations in div1</button>
-->
<form action="">
  <input type="radio" name="year" value="2016,2005" checked  onclick="FillDomElementWithCitedinHtml (pmid_lis_2016 + ',' + pmid_lis_2005,'div1');">&nbsp;&nbsp;2016 & 2005 Articles &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="radio" name="year" value="2005"  onclick="FillDomElementWithCitedinHtml (pmid_lis_2005,'div1')">&nbsp;&nbsp;2005 Article&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="radio" name="year" value="2016"  onclick="FillDomElementWithCitedinHtml (pmid_lis_2016,'div1')">&nbsp;&nbsp;2016 Article 

</form>
<span style="font-size: 80%;">(<i>Content created with up-to-date data from NCBI Pubmed database</i>)</span>


<hr/>
<div id="div1"></div>
<hr/>


<div id="div2">
<!-- DIV2:<br/>  -->
</div>




<!-- 2016 citations-->
<!--
<fieldset class=" collapsible collapsed">
  <legend ><span class="fieldset-legend">List of pmids citing 2016 LIS NAR paper, json:</span></legend>
    <div  class="fieldset-wrapper"> 
    <iframe id="frameviewer2016" frameborder="0" width="1200" height="500" scrolling="yes"  name="frameviewer2016" 
      src=<?php echo $url_2016_citations; ?>
      >
      
      </iframe>  
  </div>
</fieldset>
-->


<!-- 2005 citations-->
<!--
<fieldset class=" collapsible collapsed">
  <legend ><span class="fieldset-legend">List of pmids citing 2005 LIS NAR paper, json:</span></legend>
  <div  class="fieldset-wrapper"> 
    <iframe id="frameviewer2005" frameborder="0" width="1200" height="500" scrolling="yes"  name="frameviewer2005"
      srcdoc="<html><body><pre><?php print_r($json_2005) ?> </pre></body></html>" ></iframe>
  </div>
</fieldset>
-->

<!--  THIS SECTION WORKS (PHP used to get json string, extract values and display)  -->  

<!--
<div>
debug vars:<br/>
<?php print $url_2016_citations; ?><br/>
<?php print $url_2005_citations; ?><br/>
<?php echo $json_2005_str; ?> <br/>
</div>
<hr/>

<div>
<?php  print_r($json_2005);  ?><br>==============<br>
<?php  //print_r($json_2005['linksets'][0]['linksetdbs'][0]['links']);    ?>
<?php print_r($pmids_2005);    ?>
</div>

<div>
  <?php
    foreach ($pmids_2005 as $pmid) {
      echo $pmid, "<br/>";
      }
  ?>
</div>
-->



<!--  SCRATCH PAD  -->
<!--
src="https://www.ncbi.nlm.nih.gov/pubmed?linkname=pubmed_pubmed_citedin&from_uid=26546515"  
src="https://www.ncbi.nlm.nih.gov/pubmed?linkname=pubmed_pubmed_citedin&from_uid=15608283

-->

