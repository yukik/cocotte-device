/*jshint maxlen:1000 */

/*
 * fork express-device
 * thanks Rodrigo Guerreiro
 * https://github.com/rguerreiro/express-device
 */

'use strict';

/*
 * デバイス情報の取得を行いセッションに設定
 * 既に設定されている場合は処理はスキップ
 *
 * tv     : テレビ
 * tablet : タブレット
 * phone  : スマートフォン
 * desktop: パソコン
 * bot    : ボット
 * unknown: 不明
 */
module.exports = exports = function*(next) {

  if (this.session.device) {
    return yield next;
  }

  var ua = this.request.header['user-agent'];
  var device;

  if (!ua || ua === '') {
    // No user agent.
    device = null;
  }

  if (ua.match(/GoogleTV|SmartTV|Internet TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/i)) {
    // if user agent is a smart TV - http://goo.gl/FocDk
    device = 'tv';
  } else if (ua.match(/Xbox|PLAYSTATION 3|Wii/i)) {
    // if user agent is a TV Based Gaming Console
    device = 'tv';
  } else if (ua.match(/iP(a|ro)d/i) || (ua.match(/tablet/i) && !ua.match(/RX-34/i)) || ua.match(/FOLIO/i)) {
    // if user agent is a Tablet
    device = 'tablet';
  } else if (ua.match(/Linux/i) && ua.match(/Android/i) && !ua.match(/Fennec|mobi|HTC Magic|HTCX06HT|Nexus One|SC-02B|fone 945/i)) {
    // if user agent is an Android Tablet
    device = 'tablet';
  } else if (ua.match(/Kindle/i) || (ua.match(/Mac OS/i) && ua.match(/Silk/i))) {
    // if user agent is a Kindle or Kindle Fire
    device = 'tablet';
  } else if (ua.match(/GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC( Flyer|_Flyer)|Sprint ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos S7|Dell Streak 7|Advent Vega|A101IT|A70BHT|MID7015|Next2|nook/i) || (ua.match(/MB511/i) && ua.match(/RUTEM/i))) {
    // if user agent is a pre Android 3.0 Tablet
    device = 'tablet';
  } else if (ua.match(/BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google Wireless Transcoder/i)) {
    // if user agent is unique phone User Agent
    device = 'phone';
  } else if (ua.match(/Opera/i) && ua.match(/Windows NT 5/i) && ua.match(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i)) {
    // if user agent is an odd Opera User Agent - http://goo.gl/nK90K
    device = 'phone';
  } else if ((ua.match(/Windows (NT|XP|ME|9)/) && !ua.match(/Phone/i)) && !ua.match(/Bot|Spider|ia_archiver|NewsGator/i) || ua.match(/Win( ?9|NT)/i)) {
    // if user agent is Windows Desktop
    device = 'desktop';
  } else if (ua.match(/Macintosh|PowerPC/i) && !ua.match(/Silk/i)) {
    // if agent is Mac Desktop
    device = 'desktop';
  } else if (ua.match(/Linux/i) && ua.match(/X11/i) && !ua.match(/Charlotte/i)) {
    // if user agent is a Linux Desktop
    device = 'desktop';
  } else if (ua.match(/CrOS/)) {
    // if user agent is a Chrome Book
    device = 'desktop';
  } else if (ua.match(/Solaris|SunOS|BSD/i)) {
    // if user agent is a Solaris, SunOS, BSD Desktop
    device = 'desktop';
  } else if (ua.match(/curl|Bot|B-O-T|Crawler|Spider|Spyder|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|Charlotte|NewsGator|TinEye|Cerberian|SearchSight|Zao|Scrubby|Qseero|PycURL|Pompos|oegp|SBIder|yoogliFetchAgent|yacy|webcollage|VYU2|voyager|updated|truwoGPS|StackRambler|Sqworm|silk|semanticdiscovery|ScoutJet|Nymesis|NetResearchServer|MVAClient|mogimogi|Mnogosearch|Arachmo|Accoona|holmes|htdig|ichiro|webis|LinkWalker|lwp-trivial|facebookexternalhit/i) && !ua.match(/phone|Playstation/i)) {
    // if user agent is a BOT/Crawler/Spider
    device = 'bot';
  } else {
    // Otherwise assume it is a phone Device
    device = 'unknown';
  }

  // サポートしてないデバイスはunknownに設定
  if (this.app && this.app.devices && !~this.app.devices.indexOf(device)) {
    device = 'unknown';
  }

  this.session.device = device;

  return yield next;
};

