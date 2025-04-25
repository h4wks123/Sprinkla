PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`contact_number` integer NOT NULL,
	`user_type` text DEFAULT 'customer' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "password", "contact_number", "user_type") SELECT "id", "email", "password", "contact_number", "user_type" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);