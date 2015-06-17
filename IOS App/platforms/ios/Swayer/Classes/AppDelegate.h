#import <UIKit/UIKit.h>

#import <Cordova/CDVViewController.h>

@interface AppDelegate : NSObject <UIApplicationDelegate>{}

@property (nonatomic, strong) IBOutlet UIWindow* window;
@property (nonatomic, strong) IBOutlet CDVViewController* viewController;

@end
