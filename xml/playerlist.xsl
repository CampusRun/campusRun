<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>Playerlist</title>
                <link rel="stylesheet" type="text/css" href="../assets/css/jquery.mobile-1.3.2.min.css"></link>
                <script type="text/javascript" src="../assets/js/menue/jquery-1.8.1.min.js"></script>
                <script type="text/javascript" src="../assets/js/menue/jquery.mobile-1.3.2.min.js"></script>
                
            </head>
            <body>
                <div style="width:90%;margin:0px auto;">
                <div data-role="header"> 
                <h1>Playerliste</h1>
                </div>
                <div style="margin:20px auto;width:250px;">
                <table border="1" width="250px">
                <tr bgcolor="#9acd32">
                  <th>Playername</th>
                  <th>Time</th>
                  <th>Lifes</th>
                  <th>Level</th>
                </tr>
                <xsl:for-each select="Liste/Player">
                    <tr>
                      <td><xsl:value-of select="Playername"/></td>
                      <td><xsl:value-of select="Time"/></td>
                      <td><xsl:value-of select="Lifes"/></td>
                      <td><xsl:value-of select="Level"/></td>
                    </tr>
                </xsl:for-each>
                </table>
                </div>
                <div data-role="footer" class="ui-bar">
                  <a href="http://campusrun.connectiv.info/index.php" data-role="button" data-icon="arrow-l">Zurück</a>
                </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
