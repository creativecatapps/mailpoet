<?php

namespace MailPoet\Test\Acceptance;

use MailPoet\Test\DataFactories\Newsletter;

class CreateNewSegmentCest {
  public function createUserRoleSegment(\AcceptanceTester $i) {
    $i->wantTo('Create a new WP user role segment');
    $segmentTitle = 'Create User Role Segment Test';
    $i->login();
    $i->amOnMailpoetPage('Segments');
    $i->click('[data-automation-id="new-segment"]');
    $i->seeInCurrentUrl('#/new');
    $i->fillField(['name' => 'name'], $segmentTitle);
    $i->fillField(['name' => 'description'], 'Lorem ipsum dolor amed');
    $i->selectOption('form select[name=segmentType]', 'WordPress user roles');
    $i->selectOption('form select[name=wordpressRole]', 'Editor');
    $i->click('Save');
    $i->amOnMailpoetPage('Segments');
    $i->waitForText($segmentTitle, 20);
  }

  public function createEmailSegment(\AcceptanceTester $i) {
    $i->wantTo('Create a new email segment');
    $emailSubject = 'Segment Email Test';
    $newsletterFactory = new Newsletter();
    $newsletterFactory->withSubject($emailSubject)->create();
    $segmentTitle = 'Create Email Segment Test';
    $i->login();
    $i->amOnMailpoetPage('Segments');
    $i->click('[data-automation-id="new-segment"]');
    $i->seeInCurrentUrl('#/new');
    $i->fillField(['name' => 'name'], $segmentTitle);
    $i->fillField(['name' => 'description'], 'Lorem ipsum dolor amed');
    $i->selectOption('form select[name=segmentType]', 'Email');
    $i->selectOption('form select[name=action]', 'opened');
    $i->click('#select2-newsletter_id-container');
    $i->selectOptionInSelect2($emailSubject);
    $i->click('Save');
    $i->amOnMailpoetPage('Segments');
    $i->waitForText($segmentTitle, 20);
  }
}
