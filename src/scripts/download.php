<?php
include 'config.php';

if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false) {
  $isWechat = true;
} else {
  $isWechat = false;
}

if (strpos($_SERVER['HTTP_USER_AGENT'], 'Weibo') !== false) {
  $isWeibo = true;
} else {
  $isWeibo = false;
}

if (strpos($_SERVER['HTTP_USER_AGENT'], 'Android') !== false) {
  $isAndroid = true;
} else {
  $isAndroid = false;
}

if ($isAndroid) { // Android
  header('location: '.$config['download']['Android']);
} else { // iOS
  header('location: '.$config['download']['iOS']);
}
?>
