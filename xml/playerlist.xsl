<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>Playerlist</title>
            </head>
            <body>
                <h1>Playerliste</h1>
                <table border="1">
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
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
