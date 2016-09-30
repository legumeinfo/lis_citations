/*
JS functions for the lis_citations module
*/

/*
 *Sudhansu Dash
 *Feb-12-2016
 *
 */




function makeEsummaryUrl (pmid){
      //Given a pmid, creates an 'esummary' url to obtain json obj of document summary
      //TODO: 
      var esummaryUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json" + "&id=" + pmid;
      return esummaryUrl;
}  // makeEsummaryUrl


function makeElinkCitedinUrl (pmids){
    //Given pmid(s), creates an 'elink' url to obtain json obj listing the 'cited in' pubmed Ids
    var baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/elink.fcgi?dbfrom=pubmed&linkname=pubmed_pubmed_citedin'+'&retmode=json';
    var elinkCitedinUrl = baseUrl + "&id=" + pmids;
    
    return elinkCitedinUrl;
    
} //makeElinkUrl()


function getCitedinIdsFromElinkJson(elinkJson) {
    //Given a jsonObj from makeElinkCitedinUrl() returns an object with attributes, citedInIds, citedInIdsCount and the inputIds
    // Capture them as x.inputIds, x.citedInIdsCount and x.citedInIds
    
        inputIds = elinkJson.linksets[0].ids; //array 
        citedInIds = elinkJson.linksets[0].linksetdbs[0].links; //array
        citedInIdsCount = citedInIds.length
    
        //console.log("Input: " + inputIds.join() + "; " + "Count: " + citedInIds.length,citedInIds.join()); //debug
        
        return {
        inputIds : inputIds,
        citedInIdsCount : citedInIds.length,
        citedInIds : citedInIds
        };  
    
} // fn  getCitedinIdsFromPubmed(pmids)



function makeHtmlFromEsummaryJson(esummaryJson) {  //NOT DONE YET winProgress
    //Given a jsonObj from eSummary, generates html <li> for display of Docsummary
    //The jsonOBj could be for one or multiple eSummaries
    // jsonObj passed from jQuery.get(url, f())

    
    //TO DO  Take code from getDocSumAttributesFromJson (id)
    var esummaryResult = esummaryJson.result;  //main json obj containing uids list and summary for each uid
    var uidsList = esummaryResult.uids;  // array of all uids in the jsonObj from eSummary
      //(.result.uids is from the ncbi esummary json)
      //console.log("uidsList: " + uidsList.join()); //debug
    
    citation_html ="";
    
    uidsList.forEach(function(uid) {
        //Go through each uid and extract the attributes to make html
        //console.log("for-each: " + uid); //debug
        
        var authors = [];
        esummaryResult[uid]['authors'].forEach(function(author){
           authors.push([author.name]); 
        })  // forEach author
        //console.log("AUTTHORS: " + authors);  //debug
            
        var authorFirst = esummaryResult[uid]['authors'][0]['name'];
        var title = esummaryResult[uid]['title']; //console.log(title);
        var pubdate = esummaryResult[uid]['pubdate'];
        var year = pubdate.match(/^\d\d\d\d/);
        
        var issue = (esummaryResult[uid]['issue']);
        issue = (issue) ? "(" + issue + ")":""; //null if no issue else with parenthesis (issue)
        
        var pages = esummaryResult[uid]['pages'];
        var sortfirstauthor = esummaryResult[uid]['sortfirstauthor'];
        var source = esummaryResult[uid]['source']; //console.log(source);
        var volume = esummaryResult[uid]['volume']; //console.log(volume);
        
        var linkToUid = "<a href=\"https://www.ncbi.nlm.nih.gov/pubmed/" + uid + "\"" + "  target=\"_blank\">" + uid + "</a>";
        
        var citation = (authors.join(", ") + ". " + "<b>" + year + "</b>" + ". " + title + " " + "<strong>" + source + " " + volume +  issue + ":" + pages + "</strong>" + "." + " (" + linkToUid + ")");
        var citation_li = "<li>" + citation + "</li>"; // + "\n\n";
        //Creates like:
        //Dash S, Campbell JD, Cannon EK, Cleary AM, ......, Farmer AD, Cannon SB. 2016. Legume information system (LegumeInfo.org): a key component of a set of federated data resources for the legume family. Nucleic Acids Res 44(D1):D1181-8. (<a href="https://www.ncbi.nlm.nih.gov/pubmed/26546515"  target="_blank">26546515</a>)
        //console.log("citation_li: " + citation_li); //debug
        citation_html += citation_li; 
        
    })  //uidsList.forEach
    
    //console.log("citation_html: " + citation_html); //debug
    return citation_html; // Returns XMLHttpRequest {}
        
}  //function makeHtmlFromEsummaryJson(EsummaryJson)



//The main function
//=================

function FillDomElementWithCitedinHtml (pmid,domElementId) {
    //Given a pmid and a DOM element Id: generates html for the list of citing articles in pubmed
    //and fills the dom element with citation text both for
    //a.) the original article and  b.) the cited in articles
    
    
    var domElementIdHtml = "";
    
        //Display text 
        var displayText = "";//displayText2005_2016;
        if (pmid == 15608283) {
            displayText = '2005';
        } else if (pmid == 26546515) {
            displayText = '2016  <span style="font-size:80%;">(use for citing LIS)</span>';
        } else if (pmid.match(/15608283/ || /26546515/)) {
            displayText = '2016 <span style="font-size:80%;">(use for citing LIS)</span> and 2005';
        } else {
            displayText = "";
        }
        //console.log("pmid: " + pmid + "   displayText: " + displayText);//debug
    
    //Part-1
    //Citation text for the original article
    //--------------------------------------
    
    var esummaryUrl = makeEsummaryUrl (pmid);
    //console.log(esummaryUrl);
    jQuery.get(esummaryUrl,status, function(esummaryJson){  // part-1 for orig articl
        
        domElementIdHtml += "<b>" + displayText + "</b><br/>";
        //Filled in with original citation
        domElementIdHtml += makeHtmlFromEsummaryJson(esummaryJson); //+ "<br/>";
        //console.log("domElementId:" + domElementId);
        
        //Part-2
        //Citation text for cited in articles
        //-----------------------------------
        //domElementIdHtml += "Cited in: <br/>";
        
        var elinkCitedinUrl = makeElinkCitedinUrl (pmid);
        //console.log (elinkCitedinUrl); //debug
        
        //works in console//jQuery.get(makeElinkCitedinUrl(pmid_lis_2005), function(elinkJson){var x = getCitedinIdsFromElinkJson(elinkJson); console.log('x.input:count:output-ids:: ' + x.inputIds+";    "  + x.citedInIdsCount+";   " + x.citedInIds);})
        jQuery.get(makeElinkCitedinUrl(pmid), function(elinkJson){  // elinkCitedin
            var  citedinIdsFromElinkJson = getCitedinIdsFromElinkJson(elinkJson);
            //console.log ('citedinIdsFromElinkJson.input:count:output-ids:: ' + citedinIdsFromElinkJson.inputIds+";    "  + citedinIdsFromElinkJson.citedInIdsCount+";   " + citedinIdsFromElinkJson.citedInIds); //debug
           
            var subheading = "<b>Cited at Pubmed by " + citedinIdsFromElinkJson.citedInIdsCount + " articles:</b><br>";
            
            var citedinIdsList = citedinIdsFromElinkJson.citedInIds.join(); //string from array
            
            var esummaryUrl = makeEsummaryUrl (citedinIdsList);  // includes multiple citedin pubmed IDs
            jQuery.get(esummaryUrl,status, function(esummaryJson){
                  
                  domElementIdHtml += "<ul>" + subheading + makeHtmlFromEsummaryJson(esummaryJson) + "</ul>";
                  
                  //This prints it to the 'domElementId'
                  document.getElementById(domElementId).innerHTML = domElementIdHtml;
                  
            });  // part-2 for cited in articles
            
            //document.getElementById(domElementId).innerHTML = domElementIdHtml; //always use in inner jQuer.get for asyncronous way
            
        }); // elinkCitedin
              
    });  // part-1 for orig article
    //;
    
}  //FillDomElementWithCitedinHtml()




/*
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////     PREVIOUS (before refctoring) WORKING CODE BELOW DON'T ALTER     /////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


function listCitingPubmedIds (ids) {
  //Given a list of pubmed ids ( coma sep), lists and makes citations html of the citing pubmed ids (via eutils elink).
  
  // Cnonstructs the elink-url
  var baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/elink.fcgi?dbfrom=pubmed&linkname=pubmed_pubmed_citedin'+'&retmode=json';
  var url = baseUrl + "&id=" + ids;
  //console.log("elink url: ",url);
  //$(selector).load(URL,data,callback);
  //jQuery(selector).load(url);  //works

  
  //http request with elink-url and callback to list the citing ids
  jQuery.get(url, function(json_obj) {
    //console.log(json_obj);
    var inputIds = json_obj.linksets[0].ids; //array
    var citedInIds = json_obj.linksets[0].linksetdbs[0].links; //array
  
    console.log("Input: " + inputIds.join() + "; " + "Count: " + citedInIds.length,citedInIds.join());
    //selector.innerHTML = "Starting ID(s):" + inputIds.join()+"<br/>";
    //selector.innerHTML += "Cited in IDs (" + citedInIds.length + "): " + citedInIds.join()+"<br/>";

    
    //For each citedInIds get document summary and create html format for relevant parts of them
    //citedInIds.forEach(getDocSumAttributesFromJson);  // 
    getDocSumAttributesFromJson(citedInIds.join()); // provide the ids as concatenated coma sep string (join())
    
    
  });  // jQuery.get citedInIds
  
  
} // listCitingPubmedIds()


function getDocSumAttributesFromJson (id) {
  
  //esummary returns json for an id. Need to make sensible html from the json       
  
  //var citingIds = listCitingPubmedIds (id); //Should be an array
  //console.log(id + "citingIds: " + citingIds);
  
  url = makeEsummaryUrl (id);  //makes esummary url for multiple Ids
  
  //
  jQuery.get(url, function(json_obj) {  //Get esummary json for multiple IDs
    
    //json_obj contains esummary for all the iput IDs
    var result = json_obj.result.uids.join();
    console.log("result: " + result)
    var htmlContent = "";
    
      //for each id creates a citation string
    json_obj.result.uids.forEach(function(id) {
      console.log("for-each: " + id);
      //var authorsAll = json_obj.result[id]['authors'].name.join(); //fails

      var authors = [];
      json_obj.result[id]['authors'].forEach(function(author){
           authors.push([author.name]); 
      })  // forEach author
      //console.log("AUTTHORS: " + authors);
      
      var authorFirst = json_obj.result[id]['authors'][0]['name'];
      var title = json_obj.result[id]['title']; //console.log(title);
      var pubdate = json_obj.result[id]['pubdate'];
      var year = pubdate.match(/^\d\d\d\d/);
      var issue = json_obj.result[id]['issue'];
      var pages = json_obj.result[id]['pages'];
      var sortfirstauthor = json_obj.result[id]['sortfirstauthor'];
      //var xxxxx = json_obj.result[id]['xxxxx'];
      var source = json_obj.result[id]['source']; //console.log(source);
      var volume = json_obj.result[id]['volume']; //console.log(volume);
      //console.log (authorFirst + ", et al. "+ title + " " + source + " " + volume + ":");
      //console.log (authorsAll + ". "+ title + " " + source + " " + volume + ":");
      //console.log (authors.join(", ") + ". "+ title + " " + source + " " + volume + ":");
      var linkToId = "<a href=\"https://www.ncbi.nlm.nih.gov/pubmed/" + id + "\"" + "  target=\"_blank\">" + id + "</a>";
      var citation = (linkToId + ": " + authors.join(", ") + ". " + year + ". " + title + " " + source + " " + volume +
                      "(" + issue + ")" + ":" + pages + ".");  
      
      //citation to html
      var citation_html = "<li>" + citation + "</li>"; // + "\n\n";
      
      
      //console.log(citation);
      htmlContent +=  citation_html;
      
      //document.getElementById("div2").innerHTML = htmlContent;

    })  // forEach id
    
    htmlContent = "<b>Cited at Pubmed by:</b><br/>" + "<ul>" + htmlContent + "</ul>";
    console.log("HTML:  " + htmlContent);
    
    document.getElementById("div2").innerHTML = htmlContent;

    
  }) //jQ.get  
  
  //console.log("HTML:  " + htmlContent);
  //console.log(id,url);


} //  getDocSumAttributesFromJson()

///////////////////////     END OF PREVIOUS WORKING CODE  ////////////////////////////////

*/

