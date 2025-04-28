CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_type` text NOT NULL,
	`product` text NOT NULL,
	`price` real NOT NULL,
	`quantity` integer NOT NULL,
	`time` text DEFAULT (CURRENT_TIME),
	`date` text DEFAULT (CURRENT_DATE),
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_product_unique` ON `products` (`product`);--> statement-breakpoint
ALTER TABLE `users` ADD `time` text DEFAULT (CURRENT_TIME);--> statement-breakpoint
ALTER TABLE `users` ADD `date` text DEFAULT (CURRENT_DATE);--> statement-breakpoint
ALTER TABLE `users` ADD `timestamp` text DEFAULT (CURRENT_TIMESTAMP);