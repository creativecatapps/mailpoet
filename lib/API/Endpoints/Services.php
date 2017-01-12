<?php
namespace MailPoet\API\Endpoints;

use Carbon\Carbon;
use MailPoet\API\Endpoint as APIEndpoint;
use MailPoet\API\Error as APIError;
use MailPoet\Services\Bridge;

if(!defined('ABSPATH')) exit;

class Services extends APIEndpoint {
  function verifyMailPoetKey($data = array()) {
    $key = isset($data['key']) ? trim($data['key']) : null;

    if(!$key) {
      return $this->badRequest(array(
        APIError::BAD_REQUEST  => __('You need to specify a key.', 'mailpoet')
      ));
    }

    try {
      $bridge = new Bridge($key);
      $result = $bridge->checkKey();
    } catch(\Exception $e) {
      return $this->errorResponse(array(
        $e->getCode() => $e->getMessage()
      ));
    }

    $code = !empty($result['code']) ? (int)$result['code'] : null;

    if($code == Bridge::MAILPOET_KEY_VALID) {
      return $this->successResponse(null);
    }

    switch($code) {
      case Bridge::MAILPOET_KEY_INVALID:
        $error = __('Your MailPoet key is invalid!', 'mailpoet');
        break;
      case Bridge::MAILPOET_KEY_EXPIRING:
        $error = sprintf(
          __('Your MailPoet key is expiring on %s!', 'mailpoet'),
          Carbon::createFromTimestamp(strtotime($result['data']['expire_at']))
            ->format('Y-m-d')
        );
        break;
      default:
        $error = sprintf(
          __('Error validating API key, please try again later (code: %s)', 'mailpoet'),
          $code
        );
        break;
    }

    return $this->errorResponse(array(APIError::BAD_REQUEST => $error));
  }
}