<?php

namespace MailPoet\Form\Block;

use MailPoet\Form\BlockWrapperRenderer;

class Textarea {
  /** @var BlockRendererHelper */
  private $rendererHelper;

  /** @var BlockWrapperRenderer */
  private $wrapper;

  public function __construct(BlockRendererHelper $rendererHelper, BlockWrapperRenderer $wrapper) {
    $this->rendererHelper = $rendererHelper;
    $this->wrapper = $wrapper;
  }

  public function render(array $block, array $formSettings): string {
    $html = '';

    $html .= $this->rendererHelper->renderLabel($block, $formSettings);

    $lines = (isset($block['params']['lines']) ? (int)$block['params']['lines'] : 1);

    $html .= '<textarea class="mailpoet_textarea" rows="' . $lines . '" ';

    $html .= 'name="data[' . $this->rendererHelper->getFieldName($block) . ']"';

    $html .= $this->rendererHelper->renderInputPlaceholder($block);

    $html .= $this->rendererHelper->getInputValidation($block);

    $html .= $this->rendererHelper->getInputModifiers($block);

    $html .= '>' . $this->rendererHelper->getFieldValue($block) . '</textarea>';

    return $this->wrapper->render($block, $html);
  }
}
