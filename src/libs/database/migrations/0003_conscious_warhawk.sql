ALTER TABLE `users` RENAME COLUMN "timestamp" TO "time_stamp";--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`building` text NOT NULL,
	`street_name` text NOT NULL,
	`city` text NOT NULL,
	`contact_number` integer NOT NULL,
	`time` text DEFAULT (CURRENT_TIME),
	`date` text DEFAULT (CURRENT_DATE),
	`time_stamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` integer NOT NULL,
	`product_type` text NOT NULL,
	`product` text NOT NULL,
	`price` real NOT NULL,
	`quantity` integer NOT NULL,
	`time` text DEFAULT (CURRENT_TIME),
	`date` text DEFAULT (CURRENT_DATE),
	`time_stamp` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`id`) REFERENCES `suppliers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "product_type", "product", "price", "quantity", "time", "date", "time_stamp") SELECT "id", "product_type", "product", "price", "quantity", "time", "date", "time_stamp" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `products_product_unique` ON `products` (`product`);