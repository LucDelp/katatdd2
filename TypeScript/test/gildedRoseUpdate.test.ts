import { Item, GildedRose } from '../app/gilded-rose';
import { expect } from "chai";

describe("Tests for the update gilded rose function", () => {

    describe("test for standards items", () => {
        it("should decrease by 1 on update", () => {
            // Given
            const items = [
                new Item("+5 Dexterity Vest", 10, 20),
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 19;
            const sellInExpected = 9;

            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);
        })

        it("should not have a negative value", () => {
            // Given
            const items = [
                new Item("+5 Dexterity Vest", 10, 0),
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 0;
            const sellInExpected = 9;

            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);
        })

        it("value should decrease twice as fast when sell in negative", () => {
            // Given
            const items = [
                new Item("+5 Dexterity Vest", -1, 5),
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 3;
            const sellInExpected = -2;

            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);
        })
    })

    describe("test for sulfuras item", () => {
        it("should not decrease value of sulfuras", () => {
            // Given
            const items = [
                new Item("Sulfuras, Hand of Ragnaros", 2, 80)
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 80;
            const sellInExpected = 2;

            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);
        })
    })

    describe("test for aged brie", () => {
        it("should increase value when updated", () => {
            // Given
            const items = [
                new Item("Aged Brie", 2, 24)
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 25;
            const sellInExpected = 1;

            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);

        })

        it("BUG should increase value when updated even with negative sellIn", () => {
            // Given
            const items = [
                new Item("Aged Brie", -2, 24)
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 26;
            const sellInExpected = -3;

            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);

        })

    })

    describe("test for backstage pass", () => {
        it("should increase by 1 value when updated and sellIn > 10", () => {
            // Given
            const items = [
                new Item("Backstage passes to a TAFKAL80ETC concert", 15, 24)
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 25;
            const sellInExpected = 14;

            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);

        })

        it("should increase by 2 value when updated and sellIn <= 10", () => {
            // Given
            const items = [
                new Item("Backstage passes to a TAFKAL80ETC concert", 10, 24)
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 26;
            const sellInExpected = 9;


            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);
        })

        it("should increase by 3 value when updated and sellIn <= 5", () => {
            // Given
            const items = [
                new Item("Backstage passes to a TAFKAL80ETC concert", 5, 24)
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 27;
            const sellInExpected = 4;


            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);
        })

        it("should drop at 0 value when concert is over", () => {
            // Given
            const items = [
                new Item("Backstage passes to a TAFKAL80ETC concert", 0, 24)
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 0;
            const sellInExpected = -1;


            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);
        })
    })

    describe("test value augmentation cap for aged brie and backstage pass", () => {
        it("should cap at 50 of value", () => {
            // Given
            const items = [
                new Item("Aged Brie", 2, 50),
                new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50)
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 50;
            const sellInExpected = 1;


            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);

            expect(qualityExpected).to.equal(gildedRose.items[1].quality);
            expect(sellInExpected).to.equal(gildedRose.items[1].sellIn);
        })
    })

    xdescribe("conjured item tests", () => {
        it("conjured items value should drop twice as fast", () => {
            // Given
            const items = [
                new Item("Conjured Mana Cake", 2, 22),
            ];

            const gildedRose = new GildedRose(items);
            const qualityExpected = 20;
            const sellInExpected = 1;


            // When
            gildedRose.updateQuality();

            // Then
            expect(qualityExpected).to.equal(gildedRose.items[0].quality);
            expect(sellInExpected).to.equal(gildedRose.items[0].sellIn);
        })
    })
})
