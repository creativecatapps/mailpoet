import { expect } from 'chai';
import { blocksToFormBodyFactory } from '../../../../assets/js/src/form_editor/store/blocks_to_form_body.jsx';
import {
  emailBlock,
  lastNameBlock,
  firstNameBlock,
  submitBlock,
  segmentsBlock,
  customTextBlock,
  customRadioBlock,
  customCheckBox,
  customDateBlock,
  customHtmlBlock,
  customSelectBlock,
  dividerBlock,
  nestedColumns,
} from './block_to_form_test_data.js';

const colorDefinitions = [{
  name: 'Black',
  slug: 'black',
  color: '#000000',
}, {
  name: 'White',
  slug: 'white',
  color: '#ffffff',
}];

const checkBodyInputBasics = (input) => {
  expect(input.id).to.be.a('string');
  expect(parseInt(input.position, 10)).to.be.a('number');
  expect(input.type).to.be.a('string');
  expect(input.type).to.be.not.empty;
};

const formBlocksToBody = blocksToFormBodyFactory(colorDefinitions, []);

describe('Blocks to Form Body', () => {
  it('Should throw an error for wrong input', () => {
    const error = 'Mapper expects blocks to be an array.';
    expect(() => formBlocksToBody(null)).to.throw(error);
    expect(() => formBlocksToBody('hello')).to.throw(error);
    expect(() => formBlocksToBody(undefined)).to.throw(error);
    expect(() => formBlocksToBody(1)).to.throw(error);
  });

  it('Should map email block to input data', () => {
    const [input] = formBlocksToBody([emailBlock]);
    checkBodyInputBasics(input);
    expect(input.id).to.be.equal('email');
    expect(input.name).to.be.equal('Email');
    expect(input.type).to.be.equal('text');
    expect(input.position).to.be.equal('1');
    expect(input.unique).to.be.equal('0');
    expect(input.static).to.be.equal('1');
    expect(input.params.label).to.be.equal('Email Address');
    expect(input.params.required).to.be.equal('1');
    expect(input.params.label_within).to.be.undefined;
  });

  it('Should map email block with label within', () => {
    const block = { ...emailBlock };
    block.attributes.labelWithinInput = true;
    const [input] = formBlocksToBody([block]);
    checkBodyInputBasics(input);
    expect(input.params.label_within).to.be.equal('1');
  });

  it('Should map last name block to input data', () => {
    const [input] = formBlocksToBody([lastNameBlock]);
    checkBodyInputBasics(input);
    expect(input.id).to.be.equal('last_name');
    expect(input.name).to.be.equal('Last name');
    expect(input.type).to.be.equal('text');
    expect(input.position).to.be.equal('1');
    expect(input.unique).to.be.equal('1');
    expect(input.static).to.be.equal('0');
    expect(input.params.label).to.be.equal('Last Name');
    expect(input.params.required).to.be.undefined;
    expect(input.params.label_within).to.be.undefined;
  });

  it('Should map last name block with mandatory and label', () => {
    const block = { ...lastNameBlock };
    block.attributes.labelWithinInput = true;
    block.attributes.mandatory = true;
    const [input] = formBlocksToBody([block]);
    checkBodyInputBasics(input);
    expect(input.params.required).to.be.equal('1');
    expect(input.params.label_within).to.be.equal('1');
  });

  it('Should map first name block to input data', () => {
    const [input] = formBlocksToBody([firstNameBlock]);
    checkBodyInputBasics(input);
    expect(input.id).to.be.equal('first_name');
    expect(input.name).to.be.equal('First name');
    expect(input.type).to.be.equal('text');
    expect(input.position).to.be.equal('1');
    expect(input.unique).to.be.equal('1');
    expect(input.static).to.be.equal('0');
    expect(input.params.label).to.be.equal('First Name');
    expect(input.params.required).to.be.undefined;
    expect(input.params.label_within).to.be.undefined;
  });

  it('Should map first name block with mandatory and label', () => {
    const block = { ...firstNameBlock };
    block.attributes.labelWithinInput = true;
    block.attributes.mandatory = true;
    const [input] = formBlocksToBody([block]);
    checkBodyInputBasics(input);
    expect(input.params.required).to.be.equal('1');
    expect(input.params.label_within).to.be.equal('1');
  });

  it('Should map segments', () => {
    const [input] = formBlocksToBody([segmentsBlock]);
    checkBodyInputBasics(input);
    expect(input.id).to.be.equal('segments');
    expect(input.name).to.be.equal('List selection');
    expect(input.type).to.be.equal('segment');
    expect(input.params.values).to.be.an('Array');
    expect(input.params.values[0]).to.have.property('name', 'Unicorn Truthers');
    expect(input.params.values[0]).to.have.property('id', '6');
    expect(input.params.values[1]).to.have.property('is_checked', '1');
  });

  it('Should map submit block to input data', () => {
    const [input] = formBlocksToBody([submitBlock]);
    checkBodyInputBasics(input);
    expect(input.id).to.be.equal('submit');
    expect(input.name).to.be.equal('Submit');
    expect(input.type).to.be.equal('submit');
    expect(input.position).to.be.equal('1');
    expect(input.unique).to.be.equal('0');
    expect(input.static).to.be.equal('1');
    expect(input.params.label).to.be.equal('Subscribe!');
  });

  it('Should map divider block to input data', () => {
    const [divider] = formBlocksToBody([dividerBlock]);
    checkBodyInputBasics(divider);
    expect(divider.id).to.be.equal('divider');
    expect(divider.name).to.be.equal('Divider');
    expect(divider.type).to.be.equal('divider');
    expect(divider.position).to.be.equal('1');
    expect(divider.unique).to.be.equal('0');
    expect(divider.static).to.be.equal('0');
    expect(divider.params).to.be.equal('');
  });

  it('Should map multiple dividers', () => {
    const [divider1, divider2] = formBlocksToBody([dividerBlock, dividerBlock]);
    checkBodyInputBasics(divider1);
    checkBodyInputBasics(divider2);
    expect(divider1.id).to.be.equal('divider');
    expect(divider2.id).to.be.equal('divider');
    expect(divider1.position).to.be.equal('1');
    expect(divider2.position).to.be.equal('2');
  });

  it('Should custom html block to form data', () => {
    const [html] = formBlocksToBody([customHtmlBlock]);
    checkBodyInputBasics(html);
    expect(html.id).to.be.equal('html');
    expect(html.name).to.be.equal('Custom text or HTML');
    expect(html.type).to.be.equal('html');
    expect(html.position).to.be.equal('1');
    expect(html.unique).to.be.equal('0');
    expect(html.static).to.be.equal('0');
    expect(html.params.text).to.be.equal('HTML content');
    expect(html.params.nl2br).to.be.equal('1');
  });

  it('Should map custom text field', () => {
    const customField = {
      created_at: '2019-12-10T15:05:06+00:00',
      id: 1,
      name: 'Custom Field name',
      params: {
        label: 'Street name',
        required: '1',
        validate: '',
      },
      type: 'text',
      updated_at: '2019-12-10T15:05:06+00:00',
    };
    const map = blocksToFormBodyFactory(colorDefinitions, [customField]);
    const [input] = map([customTextBlock]);
    checkBodyInputBasics(input);
    expect(input.id).to.be.equal('1');
    expect(input.name).to.be.equal('Custom Field name');
    expect(input.type).to.be.equal('text');
    expect(input.position).to.be.equal('1');
    expect(input.params.label).to.be.equal('Name of the street');
    expect(input.params.required).to.be.undefined;
    expect(input.params.label_within).to.be.undefined;
    expect(input.params.validate).to.eq('alphanum');
  });

  it('Should map custom select field', () => {
    const customField = {
      created_at: '2019-12-10T15:05:06+00:00',
      id: 6,
      name: 'Custom Select',
      params: {
        label: 'Select',
        required: '1',
        values: [
          { value: 'option 1' },
        ],
      },
      type: 'select',
      updated_at: '2019-12-10T15:05:06+00:00',
    };
    const map = blocksToFormBodyFactory(colorDefinitions, [customField]);
    const [input] = map([customSelectBlock]);
    checkBodyInputBasics(input);
    expect(input.id).to.be.equal('6');
    expect(input.name).to.be.equal('Custom Select');
    expect(input.type).to.be.equal('select');
    expect(input.position).to.be.equal('1');
    expect(input.unique).to.be.equal('1');
    expect(input.params.label).to.be.equal('Select');
    expect(input.params.values).to.be.an('Array').that.has.length(2);
    expect(input.params.values[0]).to.have.property('value', 'option 1');
    expect(input.params.values[1]).to.have.property('value', 'option 2');
  });

  it('Should map custom radio field', () => {
    const customField = {
      created_at: '2019-12-10T15:05:06+00:00',
      id: 2,
      name: 'Custom Field name',
      params: {
        label: 'Options',
        required: '1',
        values: [
          { value: 'option 1' },
        ],
      },
      type: 'radio',
      updated_at: '2019-12-10T15:05:06+00:00',
    };
    const map = blocksToFormBodyFactory(colorDefinitions, [customField]);
    const [input] = map([customRadioBlock]);
    checkBodyInputBasics(input);
    expect(input.id).to.be.equal('2');
    expect(input.name).to.be.equal('Custom Field name');
    expect(input.type).to.be.equal('radio');
    expect(input.position).to.be.equal('1');
    expect(input.unique).to.be.equal('1');
    expect(input.params.label).to.be.equal('Options');
    expect(input.params.required).to.be.eq('1');
    expect(input.params.hide_label).to.eq('1');
    expect(input.params.values).to.be.an('Array').that.has.length(2);
    expect(input.params.values[0]).to.have.property('value', 'option 1');
    expect(input.params.values[1]).to.have.property('value', 'option 2');
  });

  it('Should map custom checkbox field', () => {
    const customField = {
      created_at: '2019-12-13T15:22:07+00:00',
      id: 3,
      name: 'Custom Checkbox',
      params: {
        label: 'Check',
        required: '1',
        values: [
          { value: 'option 1' },
        ],
      },
      type: 'checkbox',
      updated_at: '2019-12-13T15:22:07+00:00',
    };
    const map = blocksToFormBodyFactory(colorDefinitions, [customField]);
    const [input] = map([customCheckBox]);
    checkBodyInputBasics(input);
    expect(input.id).to.be.equal('3');
    expect(input.name).to.be.equal('Custom Checkbox');
    expect(input.type).to.be.equal('checkbox');
    expect(input.position).to.be.equal('1');
    expect(input.unique).to.be.equal('1');
    expect(input.params.label).to.be.equal('Checkbox');
    expect(input.params.required).to.be.be.undefined;
    expect(input.params.hide_label).to.be.undefined;
    expect(input.params.values).to.be.an('Array').that.has.length(1);
    expect(input.params.values[0]).to.have.property('value', 'Check this');
    expect(input.params.values[0]).to.have.property('is_checked', '1');
  });

  it('Should map custom date field', () => {
    const customField = {
      created_at: '2019-12-13T15:22:07+00:00',
      id: 6,
      name: 'Custom Date',
      params: {
        required: '1',
        is_default_today: '1',
        date_type: 'month_year',
        date_format: 'YYYY/MM',
      },
      type: 'date',
      updated_at: '2019-12-13T15:22:07+00:00',
    };
    const map = blocksToFormBodyFactory(colorDefinitions, [customField]);
    const [input] = map([customDateBlock]);
    checkBodyInputBasics(input);
    expect(input.id).to.be.equal('6');
    expect(input.name).to.be.equal('Custom Date');
    expect(input.type).to.be.equal('date');
    expect(input.position).to.be.equal('1');
    expect(input.unique).to.be.equal('1');
    expect(input.params.label).to.be.equal('Date');
    expect(input.params.required).to.be.undefined;
    expect(input.params.date_type).to.be.equal('month_year');
    expect(input.params.date_format).to.be.equal('MM/YYYY');
    expect(input.params.is_default_today).to.be.equal('1');
  });

  it('Should map nested columns blocks', () => {
    const mapped = formBlocksToBody([emailBlock, nestedColumns, submitBlock]);
    const columns = mapped[1];
    expect(mapped.length).to.be.equal(3);
    // First level
    expect(columns.body.length).to.be.equal(2);
    expect(columns.type).to.be.equal('columns');
    expect(columns.position).to.be.equal('2');
    expect(columns.params.vertical_alignment).to.be.equal('center');
    const column1 = columns.body[0];
    const column2 = columns.body[1];
    expect(column1.type).to.be.equal('column');
    expect(column1.params.width).to.be.equal(66.66);
    expect(column1.params.vertical_alignment).to.be.equal('center');
    expect(column1.body.length).to.be.equal(2);
    expect(column2.type).to.be.equal('column');
    expect(column2.body.length).to.be.equal(1);
    expect(column2.params.width).to.be.equal(33.33);
    const divider = column1.body[1];
    checkBodyInputBasics(divider);
    const submit = column2.body[0];
    checkBodyInputBasics(submit);
    const columns11 = column1.body[0];
    expect(columns11.type).to.be.equal('columns');
    expect(columns11.body.length).to.be.equal(2);
    // Second level
    const column11 = columns11.body[0];
    const column12 = columns11.body[1];
    expect(column11.type).to.be.equal('column');
    expect(column11.params.width).to.be.equal(50);
    expect(column11.body.length).to.be.equal(1);
    expect(column12.type).to.be.equal('column');
    expect(column12.body.length).to.be.equal(0);
    expect(column12.params.width).to.be.equal(50);
    const input = column11.body[0];
    checkBodyInputBasics(input);
  });

  it('Should map colors for columns', () => {
    const columns = { ...nestedColumns };
    columns.attributes = {
      textColor: 'black',
      backgroundColor: 'white',
    };
    const [mapped] = formBlocksToBody([columns]);
    expect(mapped.params.text_color).to.be.equal('#000000');
    expect(mapped.params.background_color).to.be.equal('#ffffff');

    columns.attributes = {
      customTextColor: '#aaaaaa',
      customBackgroundColor: '#bbbbbb',
    };
    const [mapped2] = formBlocksToBody([columns]);
    expect(mapped2.params.text_color).to.be.equal('#aaaaaa');
    expect(mapped2.params.background_color).to.be.equal('#bbbbbb');
  });

  it('Should map class name for columns and column', () => {
    const columns = { ...nestedColumns };
    columns.attributes = {
      className: 'my-class',
    };
    const [mapped] = formBlocksToBody([columns]);
    expect(mapped.params.class_name).to.be.equal('my-class');

    const column = { ...nestedColumns.innerBlocks[0] };
    column.attributes = {
      className: 'my-class-2',
    };
    const [mappedColumn] = formBlocksToBody([column]);
    expect(mappedColumn.params.class_name).to.be.equal('my-class-2');
  });
});
