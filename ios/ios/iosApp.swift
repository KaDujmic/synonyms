//
//  iosApp.swift
//  ios
//
//  Created by Karlo Dujmic on 24.07.2025..
//

import SwiftUI

@main
struct iosApp: App {
    var body: some Scene {
        WindowGroup {
            TabView {
                NavigationView {
                    ContentView()
                }
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("Home")
                }
                
                NavigationView {
                    CreateWordForm()
                }
                .tabItem {
                    Image(systemName: "plus.circle.fill")
                    Text("Create")
                }
            }
        }
    }
}
