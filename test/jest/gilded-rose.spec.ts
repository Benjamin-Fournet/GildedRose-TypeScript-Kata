import {GildedRose} from '@/gilded-rose';
import {Item} from "@/item";

describe('Gilded Rose', () => {
  describe('General requirements', () => {
    it('quality should not be negative', () => {
      const gildedRose = new GildedRose([new Item('+3 Dexterity Sword', 10, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).not.toBeLessThan(0);
    })

    it('quality should not be greater than 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).not.toBeGreaterThan(50);
    })
  })

  describe('Item requirements', () => {
    it('sellIn property of items should decrease by one', () => {
      const gildedRose = new GildedRose([new Item('+3 Dexterity Sword', 10, 23)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(9);
    });

    it('quality property of items before due date should decrease by one', () => {
      const gildedRose = new GildedRose([new Item('+3 Dexterity Sword', 10, 23)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(22);
    })

    it('quality property of items after due date should decrease by two', () => {
      const gildedRose = new GildedRose([new Item('+3 Dexterity Sword', -1, 23)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).not.toBeLessThan(21);
    })
  });

  describe('Aged Brie requirements', () => {
    it('quality property should increase by one', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 35)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(36);
    })
  })

  describe('Sulfuras requirements', () => {
    it('quality should not decrease', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(80);
    })

    it('sellIn should not decrease', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(10);
    })
  })

  describe('Backstage passes requirements', () => {
    it('quality property should increase by one when sellIn greater than 10', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 15)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(16);
    })

    it('quality property should increase by two when sellIn is between 10 and 6', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 15)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(17);
    })

    it('quality property should increase by two when sellIn is less than or equal to 5 and 0', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 15)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(18);
    })

    it('quality property should be zero when sellIn is negative', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', -1, 15)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    })
  })

  describe('Conjured items requirements', () => {
    it('quality property of item before due date should decrease by two', () => {
      const gildedRose = new GildedRose([new Item('Conjured Sword', 15, 15)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(13);
    })

    it('quality property of item after due date should decrease by four', () => {
      const gildedRose = new GildedRose([new Item('Conjured Sword', -1, 15)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(11);
    })
  })
});
