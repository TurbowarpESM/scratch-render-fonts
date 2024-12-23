// Synchronously load TTF fonts.
// First, have Webpack load their data as Base 64 strings.
let FONTS;

const getFonts = function () {
    if (FONTS) return FONTS;
    /* eslint-disable global-require */
    FONTS = {
        'Sans Serif': require('./NotoSans-Medium.woff2'),
        'Serif': require('./SourceSerifPro-Regular.woff2'),
        'Handwriting': require('./handlee-regular.woff2'),
        'Marker': require('./Knewave.woff2'),
        'Curly': require('./Griffy-Regular.woff2'),
        'Pixel': require('./Grand9K-Pixel.woff2'),
        'Scratch': require('./ScratchSavers_b2.woff2')
    };
    /* eslint-enable global-require */

    // For each Base 64 string,
    // 1. Replace each with a usable @font-face tag that points to a Data URI.
    // 2. Inject the font into a style on `document.body`, so measurements
    //    can be accurately taken in SvgRenderer._transformMeasurements.
    for (const fontName in FONTS) {
        const fontData = FONTS[fontName];
        FONTS[fontName] = '@font-face {' +
            `font-family: "${fontName}";src: url("data:font/woff2;base64,${fontData}");}`;
    }

    if (!document.getElementById('scratch-font-styles')) {
        let css = '';
        for (const fontName in FONTS) {
            css += FONTS[fontName];
        }

        const documentStyleTag = document.createElement('style');
        documentStyleTag.id = 'scratch-font-styles';
        documentStyleTag.textContent = css;
        document.body.insertBefore(documentStyleTag, document.body.firstChild);
    }

    return FONTS;
};

module.exports = getFonts;
