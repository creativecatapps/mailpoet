<?php
namespace MailPoet\Newsletter\Shortcodes;

class Shortcodes {
  public $newsletter;
  public $subscriber;

  function __construct(
    $newsletter = false,
    $subscriber = false
  ) {
    $this->newsletter = $newsletter;
    $this->subscriber = $subscriber;
  }

  function extract($text) {
    preg_match_all('/\[(?:\w+):.*?\]/', $text, $shortcodes);
    return array_unique($shortcodes[0]);
  }

  function process($shortcodes, $text) {
    $processed_shortcodes = array_map(
      function($shortcode) use($text) {
        preg_match(
          '/\[(?P<type>\w+):(?P<action>\w+)(?:.*?default:(?P<default>.*?))?\]/',
          $shortcode,
          $shortcode_details
        );
        $shortcode_class =
          __NAMESPACE__ . '\\Categories\\' . ucfirst($shortcode_details['type']);
        $shortcode_action = $shortcode_details['action'];
        $shortcode_default_value = isset($shortcode_details['default'])
          ? $shortcode_details['default'] : false;
        if(!class_exists($shortcode_class)) return false;
        return $shortcode_class::process(
          $shortcode_action,
          $shortcode_default_value,
          $this->newsletter,
          $this->subscriber,
          $text
        );
      }, $shortcodes);
    return $processed_shortcodes;
  }

  function replace($text) {
    $shortcodes = $this->extract($text);
    $processed_shortcodes = $this->process($shortcodes, $text);
    $shortcodes = array_intersect_key($shortcodes, $processed_shortcodes);
    return str_replace($shortcodes, $processed_shortcodes, $text);
  }
}