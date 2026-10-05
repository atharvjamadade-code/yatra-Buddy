package com.yatrabuddy.app.ui

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import com.yatrabuddy.app.data.RetrievalBuddyEngine
import kotlinx.coroutines.launch

enum class Screen(val title: String) {
    HOME("Home"),
    BUDDY("Buddy"),
    GUIDES("Guides"),
    COMMUNITY("Community"),
    SOS("SOS")
}

class MainActivity : ComponentActivity() {

    private lateinit var buddyEngine: RetrievalBuddyEngine

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Load bundled offline knowledge base from assets
        val jsonString = assets.open("knowledge.json").bufferedReader().use { it.readText() }
        buddyEngine = RetrievalBuddyEngine.fromJsonString(jsonString)

        setContent {
            MaterialTheme(
                colorScheme = darkColorScheme(
                    primary = Color(0xFFF59E0B), // Warm Amber
                    background = Color(0xFF0C0A09), // Deep Stone
                    surface = Color(0xFF1C1917),
                    error = Color(0xFFE11D48)
                )
            ) {
                YatraBuddyApp(buddyEngine = buddyEngine)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun YatraBuddyApp(buddyEngine: RetrievalBuddyEngine) {
    var currentScreen by rememberSaveable { mutableStateOf(Screen.HOME) }
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "Yatra Buddy",
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp,
                            color = Color(0xFFFEF3C7)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        // Offline status pill
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = Color(0xFF064E3B),
                            modifier = Modifier.padding(horizontal = 4.dp, vertical = 2.dp)
                        ) {
                            Text(
                                text = "100% OFFLINE",
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF34D399),
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color(0xFF1C1917)
                )
            )
        },
        bottomBar = {
            NavigationBar(containerColor = Color(0xFF1C1917)) {
                Screen.values().forEach { screen ->
                    val isSelected = currentScreen == screen
                    NavigationBarItem(
                        selected = isSelected,
                        onClick = { currentScreen = screen },
                        label = { Text(screen.title, fontSize = 11.sp) },
                        icon = {
                            when (screen) {
                                Screen.HOME -> Icon(Icons.Default.Home, contentDescription = "Home")
                                Screen.BUDDY -> Icon(Icons.Default.ChatBubble, contentDescription = "Buddy")
                                Screen.GUIDES -> Icon(Icons.Default.MenuBook, contentDescription = "Guides")
                                Screen.COMMUNITY -> Icon(Icons.Default.People, contentDescription = "Community")
                                Screen.SOS -> Icon(Icons.Default.Warning, contentDescription = "SOS", tint = Color(0xFFF43F5E))
                            }
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFFF59E0B),
                            selectedTextColor = Color(0xFFF59E0B),
                            unselectedIconColor = Color(0xFFA8A29E),
                            unselectedTextColor = Color(0xFFA8A29E),
                            indicatorColor = Color(0xFF292524)
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(Color(0xFF0C0A09))
        ) {
            when (currentScreen) {
                Screen.HOME -> HomeScreen(onNavigate = { currentScreen = it })
                Screen.BUDDY -> BuddyScreen(buddyEngine = buddyEngine)
                Screen.GUIDES -> GuidesScreen()
                Screen.COMMUNITY -> CommunityScreen()
                Screen.SOS -> SosScreen(onDial112 = {
                    // ACTION_DIAL opens the dialer with 112 and NEVER calls by itself
                    val dialIntent = Intent(Intent.ACTION_DIAL).apply {
                        data = Uri.parse("tel:112")
                    }
                    context.startActivity(dialIntent)
                })
            }
        }
    }
}

@Composable
fun HomeScreen(onNavigate: (Screen) -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "Welcome to India",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFFFEF3C7)
        )
        Text(
            text = "Your on-device travel shield. Zero mobile data needed.",
            fontSize = 12.sp,
            color = Color(0xFFA8A29E),
            modifier = Modifier.padding(top = 4.dp, bottom = 16.dp)
        )

        // Quick Tiles
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Card(
                modifier = Modifier
                    .weight(1f)
                    .height(90.dp)
                    .clickable { onNavigate(Screen.GUIDES) },
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1C1917))
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color(0xFF38BDF8))
                    Spacer(modifier = Modifier.height(6.dp))
                    Text("Visa Guide", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color.White)
                }
            }

            Card(
                modifier = Modifier
                    .weight(1f)
                    .height(90.dp)
                    .clickable { onNavigate(Screen.GUIDES) },
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1C1917))
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Icon(Icons.Default.Translate, contentDescription = null, tint = Color(0xFFF59E0B))
                    Spacer(modifier = Modifier.height(6.dp))
                    Text("Phrasebook", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color.White)
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Card(
                modifier = Modifier
                    .weight(1f)
                    .height(90.dp)
                    .clickable { onNavigate(Screen.GUIDES) },
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1C1917))
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Icon(Icons.Default.Shield, contentDescription = null, tint = Color(0xFF10B981))
                    Spacer(modifier = Modifier.height(6.dp))
                    Text("Scam Shield", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color.White)
                }
            }

            Card(
                modifier = Modifier
                    .weight(1f)
                    .height(90.dp)
                    .clickable { onNavigate(Screen.SOS) },
                colors = CardDefaults.cardColors(containerColor = Color(0xFF3B0712))
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Icon(Icons.Default.PhoneAlert, contentDescription = null, tint = Color(0xFFF43F5E))
                    Spacer(modifier = Modifier.height(6.dp))
                    Text("Emergency", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color(0xFFFECDD3))
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = { onNavigate(Screen.BUDDY) },
            modifier = Modifier.fillMaxWidth().height(48.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFF59E0B)),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text("Ask Your AI Buddy", color = Color(0xFF1C1917), fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
fun BuddyScreen(buddyEngine: RetrievalBuddyEngine) {
    var queryText by rememberSaveable { mutableStateOf("") }
    var chatHistory by rememberSaveable { mutableStateOf(listOf("Buddy: Namaste! Ask me anything about visas, taxis, or scams.")) }
    val scope = rememberCoroutineScope()

    Column(modifier = Modifier.fillMaxSize().padding(12.dp)) {
        LazyColumn(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(chatHistory) { msg ->
                val isUser = msg.startsWith("You:")
                Surface(
                    color = if (isUser) Color(0xFFB45309) else Color(0xFF1C1917),
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth(if (isUser) 0.85f else 1.0f).padding(vertical = 2.dp)
                ) {
                    Text(
                        text = msg,
                        fontSize = 13.sp,
                        color = Color.White,
                        modifier = Modifier.padding(12.dp)
                    )
                }
            }
        }

        Row(
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            TextField(
                value = queryText,
                onValueChange = { queryText = it },
                placeholder = { Text("Ask about scams, visas, meter...", fontSize = 12.sp) },
                modifier = Modifier.weight(1f),
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = Color(0xFF1C1917),
                    unfocusedContainerColor = Color(0xFF1C1917),
                    focusedTextColor = Color.White
                )
            )
            Spacer(modifier = Modifier.width(8.dp))
            Button(
                onClick = {
                    if (queryText.isNotBlank()) {
                        val q = queryText.trim()
                        chatHistory = chatHistory + "You: $q"
                        queryText = ""
                        scope.launch {
                            val resp = buddyEngine.answer(q)
                            val sourceInfo = if (resp.sourceLabel != null) "\n[Source: ${resp.sourceLabel}]" else ""
                            chatHistory = chatHistory + "Buddy: ${resp.answer}$sourceInfo"
                        }
                    }
                },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFF59E0B))
            ) {
                Text("Send", color = Color(0xFF1C1917), fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun GuidesScreen() {
    var selectedTab by rememberSaveable { mutableStateOf(0) }
    val tabs = listOf("Visa", "Phrasebook", "Scams")

    Column(modifier = Modifier.fillMaxSize().padding(12.dp)) {
        TabRow(
            selectedTabIndex = selectedTab,
            containerColor = Color(0xFF1C1917),
            contentColor = Color(0xFFF59E0B)
        ) {
            tabs.forEachIndexed { index, title ->
                Tab(
                    selected = selectedTab == index,
                    onClick = { selectedTab = index },
                    text = { Text(title, fontSize = 12.sp, fontWeight = FontWeight.Bold) }
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        when (selectedTab) {
            0 -> VisaGuideTab()
            1 -> PhrasebookTab()
            2 -> ScamsGuideTab()
        }
    }
}

@Composable
fun VisaGuideTab() {
    Column(modifier = Modifier.fillMaxSize().padding(4.dp)) {
        Text("e-Visa Checklist", fontWeight = FontWeight.Bold, color = Color.White, fontSize = 15.sp)
        Spacer(modifier = Modifier.height(8.dp))
        Text("• Passport with 6+ months validity", color = Color(0xFFA8A29E), fontSize = 13.sp)
        Text("• Printed copy of Electronic Travel Auth (ETA)", color = Color(0xFFA8A29E), fontSize = 13.sp)
        Text("• Return flight or onward ticket", color = Color(0xFFA8A29E), fontSize = 13.sp)
        Text("• Hotel address confirmed for Form C", color = Color(0xFFA8A29E), fontSize = 13.sp)
        Spacer(modifier = Modifier.height(12.dp))
        Text(
            text = "Notice: Guidance only, not legal advice. Visit indianvisaonline.gov.in for official rules.",
            fontSize = 11.sp,
            color = Color(0xFF78716C)
        )
    }
}

@Composable
fun PhrasebookTab() {
    var showLargeModal by remember { mutableStateOf<String?>(null) }

    Column(modifier = Modifier.fillMaxSize().padding(4.dp)) {
        Text("Tap phrase to show in Giant Text to Driver:", fontSize = 12.sp, color = Color(0xFFF59E0B))
        Spacer(modifier = Modifier.height(8.dp))

        listOf(
            "Meter se chaliye (Please use meter)" to "मीटर से चलिए",
            "Yahan rokiye (Stop here)" to "यहाँ रोकिए",
            "Kitna hua? (How much?)" to "कितना हुआ?",
            "Sealed water bottle (Mineral water)" to "सीलबंद पानी"
        ).forEach { (roman, native) ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .clickable { showLargeModal = "$native\n\n$roman" },
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1C1917))
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(roman, fontWeight = FontWeight.Bold, color = Color.White, fontSize = 13.sp)
                        Text(native, color = Color(0xFFA8A29E), fontSize = 12.sp)
                    }
                    Icon(Icons.Default.Fullscreen, contentDescription = "Enlarge", tint = Color(0xFFF59E0B))
                }
            }
        }

        if (showLargeModal != null) {
            Dialog(onDismissRequest = { showLargeModal = null }) {
                Surface(
                    shape = RoundedCornerShape(20.dp),
                    color = Color.Black,
                    modifier = Modifier.border(2.dp, Color(0xFFF59E0B), RoundedCornerShape(20.dp))
                ) {
                    Column(
                        modifier = Modifier.padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(showLargeModal!!, fontSize = 28.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFFFEF3C7))
                        Spacer(modifier = Modifier.height(16.dp))
                        Button(onClick = { showLargeModal = null }) { Text("Close") }
                    }
                }
            }
        }
    }
}

@Composable
fun ScamsGuideTab() {
    Column(modifier = Modifier.fillMaxSize().padding(4.dp)) {
        Text("Common Tourist Scams", fontWeight = FontWeight.Bold, color = Color.White, fontSize = 15.sp)
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "1. 'Your Hotel is Closed': Driver wants hotel commission. Insist firmly on driving to your booked address.",
            color = Color(0xFFA8A29E),
            fontSize = 12.sp,
            modifier = Modifier.padding(vertical = 4.dp)
        )
        Text(
            text = "2. 'Fake Railway Office': Touts redirect you to private agencies. The real Tourist Bureau is on the 1st floor inside the station.",
            color = Color(0xFFA8A29E),
            fontSize = 12.sp,
            modifier = Modifier.padding(vertical = 4.dp)
        )
        Text(
            text = "3. 'Shoe Poop Trick': Mud squirted on shoes to extort cleaning money. Walk into a shop and clean it yourself.",
            color = Color(0xFFA8A29E),
            fontSize = 12.sp,
            modifier = Modifier.padding(vertical = 4.dp)
        )
    }
}

@Composable
fun CommunityScreen() {
    Column(modifier = Modifier.fillMaxSize().padding(12.dp)) {
        Surface(
            color = Color(0xFF292524),
            shape = RoundedCornerShape(8.dp),
            modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp)
        ) {
            Text(
                text = "Sample community posts (Backend P2P sync arriving in next release)",
                fontSize = 11.sp,
                color = Color(0xFFF59E0B),
                modifier = Modifier.padding(8.dp)
            )
        }

        listOf(
            "Sarah (UK)" to "Delhi Airport: Use the official Delhi Traffic Police prepaid booth at Pillar 10, not random drivers inside!",
            "David (Australia)" to "Always keep an unbroken seal check on bottled water. Never drink roadside ice cubes.",
            "Markus (Germany)" to "Bought my train tickets at the 1st floor International Tourist Bureau in 15 mins. Ignore touts outside!"
        ).forEach { (author, text) ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1C1917)),
                modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text(author, fontWeight = FontWeight.Bold, color = Color(0xFFFEF3C7), fontSize = 12.sp)
                    Text(text, color = Color.White, fontSize = 12.sp, modifier = Modifier.padding(top = 2.dp))
                }
            }
        }
    }
}

@Composable
fun SosScreen(onDial112: () -> Unit) {
    var showBigCard by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Surface(
            color = Color(0xFF3B0712),
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth().border(2.dp, Color(0xFFE11D48), RoundedCornerShape(16.dp))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("EMERGENCY HELP CARD", fontWeight = FontWeight.Bold, color = Color(0xFFFECDD3), fontSize = 13.sp)
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    "English: \"I am in an emergency. Please help me call police or an ambulance.\"",
                    color = Color.White,
                    fontSize = 13.sp
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    "Hindi: \"Main mushkil mein hoon. Kripya police ya ambulance bulane mein meri madad kijiye.\"",
                    color = Color(0xFFFBBF24),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(12.dp))
                Button(
                    onClick = { showBigCard = true },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF881337))
                ) {
                    Text("Show Giant Screen to Local")
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Dialer 112 button (Never dials by itself, opens phone dialer)
        Button(
            onClick = onDial112,
            modifier = Modifier.fillMaxWidth().height(54.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFE11D48)),
            shape = RoundedCornerShape(14.dp)
        ) {
            Icon(Icons.Default.Phone, contentDescription = null, tint = Color.White)
            Spacer(modifier = Modifier.width(8.dp))
            Text("Open Phone Dialer with 112", fontWeight = FontWeight.Bold, fontSize = 15.sp)
        }
        Text(
            text = "Opens dialer with 112 pre-filled. Never dials automatically.",
            fontSize = 10.sp,
            color = Color(0xFFA8A29E),
            modifier = Modifier.padding(top = 4.dp)
        )

        if (showBigCard) {
            Dialog(onDismissRequest = { showBigCard = false }) {
                Surface(
                    shape = RoundedCornerShape(24.dp),
                    color = Color.Black,
                    modifier = Modifier.border(4.dp, Color.Red, RoundedCornerShape(24.dp))
                ) {
                    Column(
                        modifier = Modifier.padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "Main mushkil mein hoon.\nKripya police ya ambulance bulane mein meri madad kijiye.",
                            fontSize = 24.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFFFBBF24),
                            lineHeight = 32.sp
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Text(
                            text = "मैं मुश्किल में हूँ।\nकृपया पुलिस या एम्बुलेंस बुलाने में मेरी मदद कीजिये।",
                            fontSize = 20.sp,
                            color = Color.White
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Button(onClick = { showBigCard = false }) {
                            Text("Close")
                        }
                    }
                }
            }
        }
    }
}
