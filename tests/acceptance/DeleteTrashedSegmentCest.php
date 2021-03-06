<?php

namespace MailPoet\Test\Acceptance;

use MailPoet\Test\DataFactories\DynamicSegment;

class DeleteTrashedSegmentCest {
  public function deleteSegmentFromTrash(\AcceptanceTester $i) {
    $i->wantTo('Delete a segment from trash');

    $segmentTitle = 'Delete Segment From Trash Test';

    $segmentFactory = new DynamicSegment();
    $segment = $segmentFactory
      ->withName($segmentTitle)
      ->withUserRoleFilter('Administrator')
      ->withDeleted()
      ->create();
    $listingAutomationSelector = '[data-automation-id="listing_item_' . $segment->id . '"]';

    $i->login();
    $i->amOnMailpoetPage('Segments');
    $i->waitForElement('[data-automation-id="filters_trash"]', 10);
    $i->click('[data-automation-id="filters_trash"]');
    $i->waitForText($segmentTitle, 10, $listingAutomationSelector);
    $i->clickItemRowActionByItemName($segmentTitle, 'Delete permanently');
    $i->waitForText('1 segment was permanently deleted.', 10);
    $i->dontSeeElement($listingAutomationSelector);
    $i->seeNoJSErrors();
  }
}
